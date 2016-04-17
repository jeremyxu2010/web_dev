import { CHANGE_NAME } from '../constants/GreetingConstant.js'

export function changeName(name) {
    return {
        type : CHANGE_NAME,
        name: name
    };
}
