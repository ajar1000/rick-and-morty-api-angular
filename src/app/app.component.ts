import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  results: {
    name: string,
    status: string,
    id: string,
    image: string,
  }[] = [];

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            characters {
              results {
                id
                name
                image
                location {
                  type
                  dimension
                }
              }
            }
          }
        `
      })
      .valueChanges.subscribe((result: any) => {
        console.log("result", result, result.data.characters.results);
        this.results = [];
        result.data.characters.results.forEach( (charResult: any) => {
          this.results.push({
            id: charResult.id,
            name: charResult.name,
            image: charResult.image,
            status: `${charResult.location.type} (${charResult.location.dimension})`,
          });
        })
      });
  }
}
