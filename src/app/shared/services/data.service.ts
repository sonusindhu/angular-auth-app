import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    toDataSourceRequestString,
    translateDataSourceResultGroups,
    translateAggregateResults,
    DataResult,
    DataSourceRequestState
} from '@progress/kendo-data-query';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';


import { environment } from '../../../environments/environment';

@Injectable()
export class DataService {
    private BASE_URL: string = environment.API_URL;

    constructor(private http: HttpClient) { }

    public fetch(url, state: DataSourceRequestState): Observable<DataResult> {
        //const queryStr = `${toDataSourceRequestString(state)}`; // Serialize the state
        const hasGroups = state.group && state.group.length;
        let dataPost:any = state;
        dataPost.CurrentPage = state.skip + 1;
        dataPost.PageSize = state.take;
        dataPost.sort = state.sort || [{'dir':'desc', 'field':'ID'}];
        return this.http
            .post(this.BASE_URL + url, dataPost)
            .pipe( // Send the state to the server
                map((data: any) =>
                    (<GridDataResult>{
                        data: data.Data,
                        total: data.Total,
                    })
            ));
    }
}