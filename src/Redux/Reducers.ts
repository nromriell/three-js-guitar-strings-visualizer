import Redux from 'redux'

import {CHANGE_VIEW_ACTION, ChangeViewActionType} from "./Actions";

export const ViewChangeReducer = (state:string = "Home", action:ChangeViewActionType) => {
    if(action.type === CHANGE_VIEW_ACTION){
        return action.payload;
    }
    return state;
};

export type ViewData = {
    name:string;
    identifier:string;
}

const baseViewData:ViewData[] = [
    {name:"Home", identifier:"Home"},
    {name:"About Me", identifier:"AboutMe"},
    {name:"More Info", identifier:"MoreInfo"},
    {name:"Blog", identifier:"Blog"}
];

export const ViewDataReducer = (state:ViewData[] = baseViewData, action:Redux.Action) => {
  return state;
};