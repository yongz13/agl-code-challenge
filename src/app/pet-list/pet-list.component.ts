import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person, Gender } from './Person';
import { Pet, PetType } from './pet';
import { of, Observable } from 'rxjs';
import { mergeMap } from "rxjs/operators";

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {

  private data: Person[] = [
    { name: '', age: 20, gender: Gender.male, pets: [{ name: 'Molly', type: PetType.cat }] },
    { name: '', age: 20, gender: Gender.male, pets: [{ name: 'Angel', type: PetType.cat }] },
    { name: '', age: 20, gender: Gender.male, pets: [{ name: 'Tigger', type: PetType.cat }, { name: 'Tigger Jr', type: PetType.dog }] },
    { name: '', age: 20, gender: Gender.male, pets: [{ name: 'Tigger senior', type: PetType.dog }] },
    { name: '', age: 20, gender: Gender.female, pets: [{ name: 'Jasper', type: PetType.cat }] },
    { name: '', age: 20, gender: Gender.female, pets: [{ name: 'Gizmo', type: PetType.cat }] },
    { name: '', age: 20, gender: Gender.female, pets: [{ name: 'Gizmo1', type: PetType.dog }] },
  ];

  constructor(private http: HttpClient) { }

  ownerCats: Observable<{male: Pet[], female: Pet[]}>;

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(): void {
    // this.http.get(`http://localhost:5000/api/people`)
    this.ownerCats = of(this.data).pipe(mergeMap((people: Person[]): Observable<{male: Pet[], female: Pet[]}> => {
      const maleOwnerPets = ([] as Pet[]).concat(...people.filter(person => person.gender === Gender.male).map(person => person.pets));
      const femaleOwnerPets = ([] as Pet[]).concat(...people.filter(person => person.gender === Gender.female).map(person => person.pets));
      const genderCats = {
        male: maleOwnerPets.filter(pet => pet.type === PetType.cat),
        female: femaleOwnerPets.filter(pet => pet.type === PetType.cat)
      };
      this.sortAlphabetically(genderCats.male);
      this.sortAlphabetically(genderCats.female);
      return of(genderCats);
    }));
  }

  private sortAlphabetically(items: Pet[]) {
    items.sort((a, b) => {
      const aName = (a.name || '');
      const bName = (b.name || '');
      if (aName < bName) { return -1; }
      if (aName > bName) { return 1; }
      return 0;
    });
  }
}
