/* eslint-disable @typescript-eslint/no-explicit-any */
import { analytics } from '@/firebase';
import {
  logEvent as firebaseLogEvent,
  setUserProperties as firebaseSetUserProperties,
  setUserId as firebaseSetUserId,
} from 'firebase/analytics';

const logEvent = (eventName: string, params?: Record<string, any>) => {
  try {
    firebaseLogEvent(analytics, eventName, params);
    logger.debug(`Analytics event logged: ${eventName}`, params);
  } catch (error) {
    logger.error(`Analytics event failed to log: ${eventName}`, error as Error, {
      eventName,
      params,
    });
  }
};

export const setUser = (userId: string, properties: Record<string, any>) => {
  logger.debug('Setting user', properties);
  firebaseSetUserId(analytics, userId);
  firebaseSetUserProperties(analytics, properties);
};

export enum LogLevel {
  Debug = 'debug',
  Info = 'info',
  Error = 'error',
}

export class Logger {
  private static instance: Logger;
  private isProduction: boolean;

  private constructor() {
    this.isProduction = import.meta.env.NODE_ENV === 'production';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public debug(message: string, params?: Record<string, any>): void {
    if (!this.isProduction) {
      console.debug(`[DEBUG] ${message}`, params);
    }
  }

  public info(message: string, params?: Record<string, any>): void {
    console.info(`[INFO] ${message}`, params);
    if (this.isProduction) {
      logEvent('info_log', { message, ...params });
    }
  }

  public error(message: string, error?: Error, params?: Record<string, any>): void {
    console.error(`[ERROR] ${message}`, error, params);
    if (this.isProduction) {
      logEvent('error_log', {
        message,
        error: error?.message,
        stack: error?.stack,
        ...params,
      });
    }
  }
}

export const logger = Logger.getInstance();
