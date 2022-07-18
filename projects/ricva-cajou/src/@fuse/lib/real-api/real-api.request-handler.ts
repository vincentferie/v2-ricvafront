import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of, take, throwError } from 'rxjs';
import { FuseRealApiReplyCallback } from './real-api.types';

export class FuseRealApiHandler {
  request!: HttpRequest<any>;
  result!: HttpResponse<any>;
  urlParams!: { [key: string]: string };

  // Private
  private _reply: FuseRealApiReplyCallback = undefined;
  private _replyCount = 0;
  private _replied = 0;

  /**
   * Constructor
   */
  constructor(public url: string, public delay?: number) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for response callback
   */
  get response(): Observable<any> {
    // If the execution limit has been reached, throw an error
    if (this._replyCount > 0 && this._replyCount <= this._replied) {
      return throwError('Execution limit has been reached!');
    }

    // If the response callback has not been set, throw an error
    if (!this._reply) {
      return throwError('Response callback function does not exist!');
    }

    // If the request has not been set, throw an error
    if (!this.request) {
      return throwError('Request does not exist!');
    }

    // If the request has not been set, throw an error
    if (!this.result) {
      return throwError('Response does not exist!');
    }
    // Increase the replied count
    this._replied++;

    // Execute the reply callback
    const replyResult = this._reply({
      request: this.request,
      result: this.result,
      urlParams: this.urlParams,
    });

    // If the result of the reply callback is an observable...
    if (replyResult instanceof Observable) {
      // Return the result as it is
      return replyResult.pipe();
    }

    // Otherwise, return the result as an observable
    return of(replyResult).pipe();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Reply
   *
   * @param callback
   */
  reply(callback: FuseRealApiReplyCallback): void {
    // Store the reply
    this._reply = callback;
  }

  /**
   * Reply count
   *
   * @param count
   */
  replyCount(count: number): void {
    // Store the reply count
    this._replyCount = count;
  }
}
