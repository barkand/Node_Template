declare namespace NodeJS {
  interface ProcessEnv {
    SERVER_PATH: string;
    SERVER_PORT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_CACHE_ACTIVE: string;
    DB_CACHE_HOST: string;
    DB_CACHE_PORT: string;
    DB_CACHE_PASSWORD: string;
    SECRET_KEY: string;
    SECRET_KEY_LIFE_TIME: string;
    REFRESH_SECRET_KEY: string;
    REFRESH_SECRET_KEY_LIFE_TIME: string;
    SITE_PATH: string;
    UPLOAD_FOLDER: string;
    WAIT_TIME_FOR_CODE: string;
    MAIL_HOST: string;
    MAIL_PORT: string;
    MAIL_FROM: string;
    MAIL_PASSWORD: string;
    MOBILE_LINK: string;
    MOBILE_FROM: string;
    MOBILE_KEY: string;
    MOBILE_PATTERN_CODE: string;
    MOBILE_VAR: string;
  }
}
