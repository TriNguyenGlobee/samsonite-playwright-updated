import * as dotenv from 'dotenv';
dotenv.config();

// Environment name
export type EnvironmentName = 'dev' | 'stg' | 'prod';
export type Locale = 'sg' | 'jp' | 'tw' | 'ph' | 'au' | 'my' | 'id' | 'nz' | 'hk' | 'kr' | 'in' | 'th';

interface Credentials {
    username: string;
    password: string;
    gg_username: string;
    gg_password: string;
    fb_username: string;
    fb_password: string;
}

interface EnvironmentConfig {
    baseURL: string;
    credentials: Credentials;
    basicAuthUser?: string;
    basicAuthPass?: string;
}

// Environment list
const environments: Record<EnvironmentName, Record<Locale, EnvironmentConfig>> = {
    dev: {
        sg: {
            baseURL: 'https://sssg.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_SG as string,
                password: process.env.DEV_PASSWORD_SG as string,
                gg_username: process.env.DEV_GG_USERNAME_SG as string,
                gg_password: process.env.DEV_GG_PASSWORD_SG as string,
                fb_username: process.env.DEV_FB_USERNAME_SG as string,
                fb_password: process.env.DEV_FB_PASSWORD_SG as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        jp: {
            baseURL: 'https://ssjp.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_JP as string,
                password: process.env.DEV_PASSWORD_JP as string,
                gg_username: process.env.DEV_GG_USERNAME_JP as string,
                gg_password: process.env.DEV_GG_PASSWORD_JP as string,
                fb_username: process.env.DEV_FB_USERNAME_JP as string,
                fb_password: process.env.DEV_FB_PASSWORD_JP as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        tw: {
            baseURL: 'https://sstw.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_TW as string,
                password: process.env.DEV_PASSWORD_TW as string,
                gg_username: process.env.DEV_GG_USERNAME_TW as string,
                gg_password: process.env.DEV_GG_PASSWORD_TW as string,
                fb_username: process.env.DEV_FB_USERNAME_TW as string,
                fb_password: process.env.DEV_FB_PASSWORD_TW as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        ph: {
            baseURL: 'https://ssph.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_PH as string,
                password: process.env.DEV_PASSWORD_PH as string,
                gg_username: process.env.DEV_GG_USERNAME_PH as string,
                gg_password: process.env.DEV_GG_PASSWORD_PH as string,
                fb_username: process.env.DEV_FB_USERNAME_PH as string,
                fb_password: process.env.DEV_FB_PASSWORD_PH as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        au: {
            baseURL: 'https://ssau.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_AU as string,
                password: process.env.DEV_PASSWORD_AU as string,
                gg_username: process.env.DEV_GG_USERNAME_AU as string,
                gg_password: process.env.DEV_GG_PASSWORD_AU as string,
                fb_username: process.env.DEV_FB_USERNAME_AU as string,
                fb_password: process.env.DEV_FB_PASSWORD_AU as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        my: {
            baseURL: 'https://ssmy.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_MY as string,
                password: process.env.DEV_PASSWORD_MY as string,
                gg_username: process.env.DEV_GG_USERNAME_MY as string,
                gg_password: process.env.DEV_GG_PASSWORD_MY as string,
                fb_username: process.env.DEV_FB_USERNAME_MY as string,
                fb_password: process.env.DEV_FB_PASSWORD_MY as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        id: {
            baseURL: 'https://ssid.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_ID as string,
                password: process.env.DEV_PASSWORD_ID as string,
                gg_username: process.env.DEV_GG_USERNAME_ID as string,
                gg_password: process.env.DEV_GG_PASSWORD_ID as string,
                fb_username: process.env.DEV_FB_USERNAME_ID as string,
                fb_password: process.env.DEV_FB_PASSWORD_ID as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        nz: {
            baseURL: 'https://ssnz.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_NZ as string,
                password: process.env.DEV_PASSWORD_NZ as string,
                gg_username: process.env.DEV_GG_USERNAME_NZ as string,
                gg_password: process.env.DEV_GG_PASSWORD_NZ as string,
                fb_username: process.env.DEV_FB_USERNAME_NZ as string,
                fb_password: process.env.DEV_FB_PASSWORD_NZ as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        hk: {
            baseURL: 'https://sshk.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_HK as string,
                password: process.env.DEV_PASSWORD_HK as string,
                gg_username: process.env.DEV_GG_USERNAME_HK as string,
                gg_password: process.env.DEV_GG_PASSWORD_NZ as string,
                fb_username: process.env.DEV_FB_USERNAME_HK as string,
                fb_password: process.env.DEV_FB_PASSWORD_HK as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        kr: {
            baseURL: 'https://sskr.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_KR as string,
                password: process.env.DEV_PASSWORD_KR as string,
                gg_username: process.env.DEV_GG_USERNAME_KR as string,
                gg_password: process.env.DEV_GG_PASSWORD_KR as string,
                fb_username: process.env.DEV_FB_USERNAME_KR as string,
                fb_password: process.env.DEV_FB_PASSWORD_KR as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        in: {
            baseURL: 'https://ssin.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_IN as string,
                password: process.env.DEV_PASSWORD_IN as string,
                gg_username: process.env.DEV_GG_USERNAME_IN as string,
                gg_password: process.env.DEV_GG_PASSWORD_IN as string,
                fb_username: process.env.DEV_FB_USERNAME_IN as string,
                fb_password: process.env.DEV_FB_PASSWORD_IN as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        },
        th: {
            baseURL: 'https://ssth.dev.samsonite-asia.com/',
            credentials: {
                username: process.env.DEV_USERNAME_TH as string,
                password: process.env.DEV_PASSWORD_TH as string,
                gg_username: process.env.DEV_GG_USERNAME_TH as string,
                gg_password: process.env.DEV_GG_PASSWORD_TH as string,
                fb_username: process.env.DEV_FB_USERNAME_TH as string,
                fb_password: process.env.DEV_FB_PASSWORD_TH as string
            },
            basicAuthUser: process.env.DEV_BASIC_AUTH_USER,
            basicAuthPass: process.env.DEV_BASIC_AUTH_PASS,
        }
    },
    stg: {
        sg: {
            baseURL: 'https://sssg.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_SG as string,
                password: process.env.STG_PASSWORD_SG as string,
                gg_username: process.env.STG_GG_USERNAME_SG as string,
                gg_password: process.env.STG_GG_PASSWORD_SG as string,
                fb_username: process.env.STG_FB_USERNAME_SG as string,
                fb_password: process.env.STG_FB_PASSWORD_SG as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        jp: {
            baseURL: 'https://ssjp.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_JP as string,
                password: process.env.STG_PASSWORD_JP as string,
                gg_username: process.env.STG_GG_USERNAME_JP as string,
                gg_password: process.env.STG_GG_PASSWORD_JP as string,
                fb_username: process.env.STG_FB_USERNAME_JP as string,
                fb_password: process.env.STG_FB_PASSWORD_JP as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        tw: {
            baseURL: 'https://sstw.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_TW as string,
                password: process.env.STG_PASSWORD_TW as string,
                gg_username: process.env.STG_GG_USERNAME_TW as string,
                gg_password: process.env.STG_GG_PASSWORD_TW as string,
                fb_username: process.env.STG_FB_USERNAME_TW as string,
                fb_password: process.env.STG_FB_PASSWORD_TW as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        ph: {
            baseURL: 'https://ssph.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_PH as string,
                password: process.env.STG_PASSWORD_PH as string,
                gg_username: process.env.STG_GG_USERNAME_PH as string,
                gg_password: process.env.STG_GG_PASSWORD_PH as string,
                fb_username: process.env.STG_FB_USERNAME_PH as string,
                fb_password: process.env.STG_FB_PASSWORD_PH as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        au: {
            baseURL: 'https://ssau.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_AU as string,
                password: process.env.STG_PASSWORD_AU as string,
                gg_username: process.env.STG_GG_USERNAME_AU as string,
                gg_password: process.env.STG_GG_PASSWORD_AU as string,
                fb_username: process.env.STG_FB_USERNAME_AU as string,
                fb_password: process.env.STG_FB_PASSWORD_AU as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        my: {
            baseURL: 'https://ssmy.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_MY as string,
                password: process.env.STG_PASSWORD_MY as string,
                gg_username: process.env.STG_GG_USERNAME_MY as string,
                gg_password: process.env.STG_GG_PASSWORD_MY as string,
                fb_username: process.env.STG_FB_USERNAME_MY as string,
                fb_password: process.env.STG_FB_PASSWORD_MY as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        id: {
            baseURL: 'https://ssid.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_ID as string,
                password: process.env.STG_PASSWORD_ID as string,
                gg_username: process.env.STG_GG_USERNAME_ID as string,
                gg_password: process.env.STG_GG_PASSWORD_ID as string,
                fb_username: process.env.STG_FB_USERNAME_ID as string,
                fb_password: process.env.STG_FB_PASSWORD_ID as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        nz: {
            baseURL: 'https://ssnz.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_NZ as string,
                password: process.env.STG_PASSWORD_NZ as string,
                gg_username: process.env.STG_GG_USERNAME_NZ as string,
                gg_password: process.env.STG_GG_PASSWORD_NZ as string,
                fb_username: process.env.STG_FB_USERNAME_NZ as string,
                fb_password: process.env.STG_FB_PASSWORD_NZ as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        hk: {
            baseURL: 'https://sshk.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_HK as string,
                password: process.env.STG_PASSWORD_HK as string,
                gg_username: process.env.STG_GG_USERNAME_HK as string,
                gg_password: process.env.STG_GG_PASSWORD_HK as string,
                fb_username: process.env.STG_FB_USERNAME_HK as string,
                fb_password: process.env.STG_FB_PASSWORD_HK as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        kr: {
            baseURL: 'https://sskr.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_KR as string,
                password: process.env.STG_PASSWORD_KR as string,
                gg_username: process.env.STG_GG_USERNAME_KR as string,
                gg_password: process.env.STG_GG_PASSWORD_KR as string,
                fb_username: process.env.STG_FB_USERNAME_KR as string,
                fb_password: process.env.STG_FB_PASSWORD_KR as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        in: {
            baseURL: 'https://ssin.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_IN as string,
                password: process.env.STG_PASSWORD_IN as string,
                gg_username: process.env.STG_GG_USERNAME_IN as string,
                gg_password: process.env.STG_GG_PASSWORD_IN as string,
                fb_username: process.env.STG_FB_USERNAME_IN as string,
                fb_password: process.env.STG_FB_PASSWORD_IN as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        },
        th: {
            baseURL: 'https://ssth.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.STG_USERNAME_TH as string,
                password: process.env.STG_PASSWORD_TH as string,
                gg_username: process.env.STG_GG_USERNAME_TH as string,
                gg_password: process.env.STG_GG_PASSWORD_TH as string,
                fb_username: process.env.STG_FB_USERNAME_TH as string,
                fb_password: process.env.STG_FB_PASSWORD_TH as string
            },
            basicAuthUser: process.env.STG_BASIC_AUTH_USER,
            basicAuthPass: process.env.STG_BASIC_AUTH_PASS,
        }
    },
    prod: {
        sg: {
            baseURL: 'https://www.samsonite.com.sg/',
            credentials: {
                username: process.env.PROD_USERNAME_SG as string,
                password: process.env.PROD_PASSWORD_SG as string,
                gg_username: process.env.PROD_GG_USERNAME_SG as string,
                gg_password: process.env.PROD_GG_PASSWORD_SG as string,
                fb_username: process.env.PROD_FB_USERNAME_SG as string,
                fb_password: process.env.PROD_FB_PASSWORD_SG as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        jp: {
            baseURL: 'https://ssjp.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_JP as string,
                password: process.env.PROD_PASSWORD_JP as string,
                gg_username: process.env.PROD_GG_USERNAME_JP as string,
                gg_password: process.env.PROD_GG_PASSWORD_JP as string,
                fb_username: process.env.PROD_FB_USERNAME_JP as string,
                fb_password: process.env.PROD_FB_PASSWORD_JP as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        tw: {
            baseURL: 'https://sstw.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_TW as string,
                password: process.env.PROD_PASSWORD_TW as string,
                gg_username: process.env.PROD_GG_USERNAME_TW as string,
                gg_password: process.env.PROD_GG_PASSWORD_TW as string,
                fb_username: process.env.PROD_FB_USERNAME_TW as string,
                fb_password: process.env.PROD_FB_PASSWORD_TW as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        ph: {
            baseURL: 'https://ssph.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_PH as string,
                password: process.env.PROD_PASSWORD_PH as string,
                gg_username: process.env.PROD_GG_USERNAME_PH as string,
                gg_password: process.env.PROD_GG_PASSWORD_PH as string,
                fb_username: process.env.PROD_FB_USERNAME_PH as string,
                fb_password: process.env.PROD_FB_PASSWORD_PH as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        au: {
            baseURL: 'https://ssau.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_AU as string,
                password: process.env.PROD_PASSWORD_AU as string,
                gg_username: process.env.PROD_GG_USERNAME_AU as string,
                gg_password: process.env.PROD_GG_PASSWORD_AU as string,
                fb_username: process.env.PROD_FB_USERNAME_AU as string,
                fb_password: process.env.PROD_FB_PASSWORD_AU as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        my: {
            baseURL: 'https://ssmy.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_MY as string,
                password: process.env.PROD_PASSWORD_MY as string,
                gg_username: process.env.PROD_GG_USERNAME_MY as string,
                gg_password: process.env.PROD_GG_PASSWORD_MY as string,
                fb_username: process.env.PROD_FB_USERNAME_MY as string,
                fb_password: process.env.PROD_FB_PASSWORD_MY as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        id: {
            baseURL: 'https://ssid.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_ID as string,
                password: process.env.PROD_PASSWORD_ID as string,
                gg_username: process.env.PROD_GG_USERNAME_ID as string,
                gg_password: process.env.PROD_GG_PASSWORD_ID as string,
                fb_username: process.env.PROD_FB_USERNAME_ID as string,
                fb_password: process.env.PROD_FB_PASSWORD_ID as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        nz: {
            baseURL: 'https://ssnz.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_NZ as string,
                password: process.env.PROD_PASSWORD_NZ as string,
                gg_username: process.env.PROD_GG_USERNAME_NZ as string,
                gg_password: process.env.PROD_GG_PASSWORD_NZ as string,
                fb_username: process.env.PROD_FB_USERNAME_NZ as string,
                fb_password: process.env.PROD_FB_PASSWORD_NZ as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        hk: {
            baseURL: 'https://sshk.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_HK as string,
                password: process.env.PROD_PASSWORD_HK as string,
                gg_username: process.env.PROD_GG_USERNAME_HK as string,
                gg_password: process.env.PROD_GG_PASSWORD_HK as string,
                fb_username: process.env.PROD_FB_USERNAME_HK as string,
                fb_password: process.env.PROD_FB_PASSWORD_HK as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        kr: {
            baseURL: 'https://sskr.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_KR as string,
                password: process.env.PROD_PASSWORD_KR as string,
                gg_username: process.env.PROD_GG_USERNAME_KR as string,
                gg_password: process.env.PROD_GG_PASSWORD_KR as string,
                fb_username: process.env.PROD_FB_USERNAME_KR as string,
                fb_password: process.env.PROD_FB_PASSWORD_KR as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        in: {
            baseURL: 'https://ssin.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_IN as string,
                password: process.env.PROD_PASSWORD_IN as string,
                gg_username: process.env.PROD_GG_USERNAME_IN as string,
                gg_password: process.env.PROD_GG_PASSWORD_IN as string,
                fb_username: process.env.PROD_FB_USERNAME_IN as string,
                fb_password: process.env.PROD_FB_PASSWORD_IN as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        },
        th: {
            baseURL: 'https://ssth.stg.samsonite-asia.com/',
            credentials: {
                username: process.env.PROD_USERNAME_TH as string,
                password: process.env.PROD_PASSWORD_TH as string,
                gg_username: process.env.PROD_GG_USERNAME_TH as string,
                gg_password: process.env.PROD_GG_PASSWORD_TH as string,
                fb_username: process.env.PROD_FB_USERNAME_TH as string,
                fb_password: process.env.PROD_FB_PASSWORD_TH as string
            },
            basicAuthUser: process.env.PROD_BASIC_AUTH_USER,
            basicAuthPass: process.env.PROD_BASIC_AUTH_PASS,
        }
    }
};

// Get ENV from terminal (defautl: stg, jp)
const currentEnv: EnvironmentName = (process.env.ENV as EnvironmentName) || 'dev';
const currentLocale = (process.env.LOCALE as Locale) || 'jp';

export const Config = environments[currentEnv][currentLocale];
export const CurrentEnv = currentEnv;
export const CurrentLocale = currentLocale;
