declare module "*.css" {
    const css: { [key: string]: string };
    export default css;
}

type ErrorResponse = {
    error: { message: string }
}