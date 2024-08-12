declare module '*.mp4' {
    const src: string;
    export default src;
}

declare module '*/interface' {
    const src: Interface;
    export default src;
}

declare module '*.css' {
    const src: string;
    export default src;
}

declare module '*' {
    const src: any;
    export default src;
}