"""Render original silent editorial films from approved local still assets.
Generated concept films are separate from the clearly labelled portfolio montage.
"""
from pathlib import Path
import subprocess
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parent.parent
FONT='/System/Library/Fonts/Supplemental/Arial Bold.ttf'
films={
 'brand-materials':(['visiting-cards','letter-study','banner-display'],['On paper.','In a space.','Out in the world.']),
 'print-editorial':(['visiting-cards','flyers','print-study'],['Introduce.','Announce.','Tell your story.']),
 'street-formats':(['street-poles','bus-branding','bus-shelter'],['Along the route.','On the move.','At the next stop.'])
}
for name,(images,titles) in films.items():
 args=['ffmpeg','-y','-hide_banner','-loglevel','error']
 for im in images:args+=['-loop','1','-framerate','24','-i',str(ROOT/'public/images'/f'{im}.webp')]
 overlay_dir=ROOT/'outputs/film-titles';overlay_dir.mkdir(parents=True,exist_ok=True)
 for i,title in enumerate(titles):
  overlay=Image.new('RGBA',(1280,720),(0,0,0,0));d=ImageDraw.Draw(overlay)
  d.rectangle((0,0,1280,145),fill=(0,0,0,90));d.text((54,45),title,font=ImageFont.truetype(FONT,48),fill='white')
  overlay_path=overlay_dir/f'{name}-{i}.png';overlay.save(overlay_path)
  args+=['-loop','1','-framerate','24','-i',str(overlay_path)]
 filters=[]
 for i,title in enumerate(titles):
  # Native type on a quiet translucent band; smooth camera movement across each still.
  filters.append(f"[{i}:v]scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900,zoompan=z='1.025+0.0005*on':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=108:s=1280x720:fps=24,trim=duration=4.5,setpts=PTS-STARTPTS,setsar=1[base{i}];[base{i}][{i+3}:v]overlay=0:0:shortest=1,format=yuv420p[v{i}]")
 filters+=['[v0][v1]xfade=transition=fade:duration=0.6:offset=3.9[x1]','[x1][v2]xfade=transition=fade:duration=0.6:offset=7.8,fade=t=in:st=0:d=0.35,fade=t=out:st=11.9:d=0.4,format=yuv420p[out]']
 args+=['-filter_complex',';'.join(filters),'-map','[out]','-t','12.3','-an','-c:v','libx264','-threads','4','-preset','medium','-crf','24','-movflags','+faststart',str(ROOT/'public/videos'/f'{name}.mp4')]
 subprocess.run(args,check=True)
 print(name,(ROOT/'public/videos'/f'{name}.mp4').stat().st_size,flush=True)
