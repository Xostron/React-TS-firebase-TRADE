/// <reference types="react-scripts" />

// подключение import *.module.less
declare module '*.module.less' {
    const classes: { [className: string]: string };
    export default classes;
}