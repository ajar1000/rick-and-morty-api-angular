import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  created: string;
  image: string;
}

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent {
  id?: string;
  character?: Character;
  loading: boolean = true;

  constructor( 
    private router: ActivatedRoute,
    private apollo: Apollo,
  )
  {
    this.router.params.subscribe(param => {
      this.id = param["id"];
      this.loading = true;

      this.apollo
        .query({
          query: gql`
          query getCharacter($id: [ID!]!) {
            charactersByIds(ids: $id) {
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
            id: [this.id]
          }
        })
        .subscribe( s => {
          console.log( s );
          const charactersByIds: any[] = (s.data as any).charactersByIds;
          this.character = charactersByIds.map( c => ({
            id: c.id,
            name: c.name,
            status: c.status,
            species: c.species,
            type: c.type,
            gender: c.gender,
            created: c.created,
            image: c.image,
          }))[0];
          this.loading = false;
        })
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