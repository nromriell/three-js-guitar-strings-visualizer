export const CHANGE_VIEW_ACTION = "CHANGE_VIEW";

export type ChangeViewActionType = {
    type:string;
    payload:string;
}

export const ChangeView = (view:string) => {
    return {type:"CHANGE_VIEW", payload:view}
};

