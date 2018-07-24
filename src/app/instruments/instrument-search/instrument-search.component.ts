import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Category} from './category.model';
import { Router, ActivatedRoute } from "@angular/router";
import {InstrumentModel} from '../instrument.model';

@Component({
  selector: 'app-instrument-search',
  templateUrl: './instrument-search.component.html',
  styleUrls: ['./instrument-search.component.css']
})
export class InstrumentSearchComponent implements OnInit {
	myControl = new FormControl();
  	options: Category[] = [
  		{name: 'Capacitores'},
	    {name: 'Herramientas'},
	    {name: 'Diodos'},
	    {name: "Transistores"}
  	];
  	filteredOptions: Observable<Category[]>;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Category>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user?: Category): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Category[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSavePost(){
    this.router.navigate(["categories", this.myControl.value.name], {relativeTo: this.route} );
  }

}
