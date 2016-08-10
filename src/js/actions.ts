export default class Actions {
    public static CHANGE_NAME:string = 'change name';
    public static TOOGLE_MASK:string = 'toogle mask';
    
    public static changeName = (name: string) => {
        return (dispatch, getState ) => {
            if(name.length > 5) {
                return;
            }
            
            dispatch(makeSimpleActionCreator(Actions.CHANGE_NAME, 'name')(name));
        };
    };
}

function makeSimpleActionCreator(type, ...argsNames) {
    return (...args) => {
        let action = { type };
        argsNames.forEach((arg, index) => {
            action[argsNames[index]] = args[index];
        });
        return action;
    };
}