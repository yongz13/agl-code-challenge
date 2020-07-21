import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person, Gender } from './Person';
import { Pet, PetType } from './pet';
import { of } from 'rxjs';
import { take } from "rxjs/operators";

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

  malesPets: Pet[] = [];
  femalesPets: Pet[] = [];
  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(): void {
    // this.http.get(`http://localhost:5000/api/people`)
    of(this.data).pipe(take(1)).subscribe((people: Person[]) => {
      people.map(person => {
        if (person && person.pets && person.pets.length) {
          if (person.gender === Gender.male) {
            this.malesPets.push(...person.pets.filter(pet => pet.type === PetType.cat));
          } else if (person.gender === Gender.female) {
            this.femalesPets.push(...person.pets.filter(pet => pet.type === PetType.cat));
          }
        }
      });
      this.sortAlphabetically(this.malesPets);
      this.sortAlphabetically(this.femalesPets);
    }, (err) => {
        console.log(err);
    });
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
