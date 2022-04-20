import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface Recipe {
  name: string;
  
  calories: number;
}
const RECIPES: Recipe[] = [
  { name: 'Receta 001', calories: 100 },
  { name: 'Receta 002', calories: 350 },
  { name: 'Receta 003', calories: 220 },
  { name: 'Receta 004', calories: 180 },
  { name: 'Receta 005', calories: 150 },
]
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data = RECIPES
  constructor(private toastr: ToastrService,
    private router: Router) {
  }

  ngOnInit(): void {
    console.log(this.data)
  }
  redirectToDespensa(): void {
    this.toastr.info('Esta ventana se encuentra en construcción, vuelve luego!', 'Holaa!')
  }

  redirectToRecipes(): void {
    this.router.navigate(['/recipes'])
  }

  redirectToRestaurants(): void {
    this.router.navigate(['/restaurants'])
  }
}
