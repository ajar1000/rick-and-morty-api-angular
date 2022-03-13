import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {
  id?: string;
  constructor( 
    private router: ActivatedRoute,
    private apollo: Apollo,
  )
  {
    this.router.params.subscribe(param => {
      this.id = param["id"];

      this.apollo
        .query({
          query: gql`
          query getCharacter($id: String!) {
            charactersByIds(ids: [$id]) {
              id
              name
              status
              species
              type
              gender
              status
              created
              image
        
              origin {
                type
                name
                dimension
              }
        
              location {
                type
                name
                dimension
              }
            
              episode {
                id
                name
                air_date
              }
            }
          }
          `,
          variables: {
            id: "3"
          }
        })
        .subscribe( s => console.log( s ))
      });
  }
}

/*
# Write your query or mutation here
{
  charactersByIds(ids: ["3"]) {
     id
      name
      status
      species
      type
      gender
      status
      created
      image

      origin {
        type
        name
        dimension
      }

      location {
        type
        name
        dimension
      }
    
    episode {
      id
      name
      air_date
    }
  }
}
*/