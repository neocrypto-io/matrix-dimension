import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { AuthedApi } from "../authed-api";
import { FE_Bridge, FE_Widget } from "../../models/integration";
import { map } from "rxjs/operators";

@Injectable()
export class AdminIntegrationsApiService extends AuthedApi {
    constructor(http: Http) {
        super(http);
    }

    public getAllWidgets(): Promise<FE_Widget[]> {
        return this.authedGet("/api/v1/dimension/admin/integrations/widget/all")
            .pipe(map(r => r.json())).toPromise();
    }

    public getAllBridges(): Promise<FE_Bridge<any>[]> {
        return this.authedGet("/api/v1/dimension/admin/integrations/bridge/all")
            .pipe(map(r => r.json())).toPromise();
    }

    public toggleIntegration(category: string, type: string, enabled: boolean): Promise<any> {
        return this.authedPost("/api/v1/dimension/admin/integrations/" + category + "/" + type + "/enabled", {enabled: enabled})
            .pipe(map(r => r.json())).toPromise();
    }

    public setIntegrationOptions(category: string, type: string, options: any): Promise<any> {
        return this.authedPost("/api/v1/dimension/admin/integrations/" + category + "/" + type + "/options", {options: options})
            .pipe(map(r => r.json())).toPromise();
    }
}
