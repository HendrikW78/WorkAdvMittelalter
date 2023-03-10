/// <reference types="@workadventure/iframe-api-typings" />
// Mittelalter

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully');

let currentPopup: any = undefined;

// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

    WA.room.onEnterLayer('clockZone').subscribe(() => {
        const today = new Date();
        const time = today.getHours() + ":" + today.getMinutes();
        currentPopup = WA.ui.openPopup("clockPopup",time + " Uhr",[]);
    })

    WA.room.onLeaveLayer('clockZone').subscribe(closePopup)

    WA.room.area.onEnter('schildEntry').subscribe(() => {
        currentPopup = WA.ui.openPopup("popWillkommen","Willkommen im Mittelalter",[]);
    })

    WA.room.area.onLeave('schildEntry').subscribe(closePopup)

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};
