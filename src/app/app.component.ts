import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'space-launch';
  spaceResponse: any;
  jsonResponse: any;
  launchSuccess: boolean;

  constructor(private http: HttpClient
    ) { }

    ngOnInit(){
      
        this.http
        .get<any>(`https://api.spaceXdata.com/v3/launches?limit=100`)
        .subscribe(
          response => {
          
            this.spaceResponse = response;
            this.jsonResponse = response;

          },
          error => {
            alert( 'Something went wrong!');
            console.log( 'Something went wrong!' );                        
          }
        );
    }

    launchSuccessList(success: any){

      this.launchSuccess = success;

      this.spaceResponse =  this.jsonResponse.filter(
        m =>{
          return (m.launch_success === success); 
        } 
      );

      return this.spaceResponse;
    }

    launchLandList(success: any){

      this.launchSuccess = true;
      this.spaceResponse = this.jsonResponse.filter(
        m =>{
          return (m.launch_success === success);  
        } 
      );

      return this.spaceResponse;
    }

 launchYearsList(year: any){

    this.spaceResponse =  this.jsonResponse.filter(
      m =>{
        return (m.launch_year.includes(year)); 
      } 
    );

    return this.spaceResponse;
  }
}
