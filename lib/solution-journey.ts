export type JourneyStop = { label: string; title: string; description: string; products: string[]; x: number; y: number };
export type BusinessScene = { id: string; short: string; line: string; alt: string; stops: JourneyStop[] };
export const businessScenes: BusinessScene[] = [
 {id:'new-store-launch',short:'Store launch',line:'From “coming soon” to “come on in.”',alt:'Illustrative new lifestyle shop with orange fascia, opening window graphics and printed flyers by the entrance.',stops:[
 {label:'Get noticed',title:'An opening people can see.',description:'Give your new address a clear identity, visible from the approach and after dark.',products:['led-signboards','banners'],x:50,y:14},
 {label:'Invite them in',title:'Give passers-by a reason to stop.',description:'Bring the launch message onto the window and entrance, with one clear invitation.',products:['banners','flyers-pamphlets'],x:80,y:38},
 {label:'Stay with them',title:'Let the introduction travel.',description:'A flyer or visiting card puts your details in someone’s hands after their first visit.',products:['visiting-cards','flyers-pamphlets'],x:75,y:80}]},
 {id:'retail-showrooms',short:'Retail',line:'The experience begins before the door.',alt:'Illustrative homewares showroom with dimensional identity, window promotion and interior product displays.',stops:[
 {label:'Draw attention',title:'Make your frontage recognisable.',description:'Bring the facade, lettering and lighting into one coherent first impression.',products:['acp-cladding','dimensional-letters'],x:66,y:10},
 {label:'Spark interest',title:'Put the offer in the window.',description:'Give seasonal collections and promotions a clear place to be seen.',products:['banners','glow-signs'],x:13,y:40},
 {label:'Carry it inside',title:'Keep the brand feeling consistent.',description:'Repeat the right materials, colours and sign style through the showroom.',products:['dimensional-letters','glow-signs'],x:72,y:47}]},
 {id:'offices-receptions',short:'Offices',line:'A confident arrival. A clear next step.',alt:'Illustrative office reception with illuminated identity wall, visitor directory and company brochures.',stops:[
 {label:'Welcome',title:'Make the first hello feel like you.',description:'Give your reception wall depth and presence with dimensional lettering.',products:['dimensional-letters'],x:74,y:22},
 {label:'Guide',title:'Help visitors find their way.',description:'Connect the reception, meeting rooms and departments with a consistent sign system.',products:['wayfinding'],x:15,y:36},
 {label:'Introduce',title:'Put your story in their hands.',description:'Use a company brochure to support the conversation and the follow-up.',products:['brochures'],x:69,y:78}]},
 {id:'real-estate',short:'Property',line:'Give a future address a presence today.',alt:'Illustrative property sales gallery with project identity, campaign board and brochure on a consultation table.',stops:[
 {label:'Establish',title:'Give the project a clear address.',description:'Plan building identity and site signage around how people approach the property.',products:['led-signboards'],x:39,y:16},
 {label:'Attract',title:'Tell the story at a larger scale.',description:'Choose campaign displays for the available site, sightlines and permissions.',products:['hoardings','banners'],x:90,y:36},
 {label:'Explain',title:'Make the details easy to take away.',description:'Bring the project story, plans and information together in a printed brochure.',products:['brochures'],x:69,y:74}]},
 {id:'events-exhibitions',short:'Events',line:'Be found. Start a conversation. Be remembered.',alt:'Illustrative exhibition stand with an overhead banner, aisle directions and printed brochures at the counter.',stops:[
 {label:'Stand out',title:'Give the stand a visible identity.',description:'Make the main message easy to spot across the exhibition floor.',products:['banners'],x:52,y:16},
 {label:'Connect',title:'Guide people into the experience.',description:'Plan directional displays around venue entrances, routes and the stand itself.',products:['wayfinding'],x:15,y:78},
 {label:'Follow through',title:'Send the conversation home.',description:'Prepare brochures and flyers that carry the essentials beyond the event.',products:['brochures','flyers-pamphlets'],x:81,y:61}]},
 {id:'hospitality',short:'Cafés & dining',line:'Set the mood before the first order.',alt:'Illustrative cafe at dusk with a glowing fascia, entrance menu display and printed takeaway materials.',stops:[
 {label:'Be seen',title:'Make the evening yours.',description:'Consider how the fascia reads in daylight and how illumination changes it after dark.',products:['led-signboards','glow-signs'],x:43,y:12},
 {label:'Set the tone',title:'A welcome with character.',description:'Bring the entrance and interior together through lettering, colour and material.',products:['dimensional-letters'],x:78,y:70},
 {label:'Stay in mind',title:'Give the next visit a little nudge.',description:'Printed menus and promotional leaflets can carry your message beyond the counter.',products:['flyers-pamphlets'],x:14,y:77}]},
 {id:'vehicle-transit',short:'On the move',line:'One campaign. More places to meet it.',alt:'Illustrative orange and charcoal branded delivery vehicles with a roadside campaign hoarding.',stops:[
 {label:'Be recognised',title:'Let the vehicle introduce you.',description:'Build the main message around the vehicle’s panels, proportions and viewing distance.',products:['vehicle-branding'],x:52,y:52},
 {label:'Keep it clear',title:'Every side has a job to do.',description:'Adapt the artwork for doors, rear panels and details people can read when stationary.',products:['vehicle-branding'],x:82,y:50},
 {label:'Extend the reach',title:'Connect the route to the campaign.',description:'Explore complementary outdoor placements around your intended audience and permissions.',products:['hoardings','banners'],x:35,y:18}]},
 {id:'safety-directional',short:'Finding the way',line:'Less hesitation. A clearer journey.',alt:'Illustrative public building lobby with a directory, directional wall sign and numbered room marker.',stops:[
 {label:'Orient',title:'Start with the whole place.',description:'A directory helps visitors understand the building before choosing a route.',products:['wayfinding'],x:20,y:48},
 {label:'Direct',title:'Give a cue where a choice happens.',description:'Place directions at junctions and transitions, with clear names and viewing distances.',products:['wayfinding'],x:72,y:37},
 {label:'Confirm',title:'Make the destination unmistakable.',description:'Use consistent room and destination identifiers so visitors know they have arrived.',products:['wayfinding','dimensional-letters'],x:92,y:40}]}
];
