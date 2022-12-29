declare global { 
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string;
            GUILD_ID: string;
            ENVIRONMENT: "dev" | "prod" | "debug"
            PERMISSION_INTEGER: number;
            CLIST_API_KEY: string;
            CLIST_USERNAME: string;
        }
    }
}