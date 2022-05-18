import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeService } from 'src/app/services/recipe.service';
import { RecipesSavedService } from 'src/app/services/recipes-saved.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  mobileQuery: MediaQueryList;
  recipesSaved: any[] = []
  recipesName: any[] = []
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher, public dialog: MatDialog,
    private recipesSavedService: RecipesSavedService,
    private recipeService: RecipeService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.viewRecipesSaved()
  }
  viewRecipesSaved(): void {
    this.recipesSavedService.GetRecipesSavedByUserID(1).subscribe(data => {
      this.recipesSaved = data
      for (let i = 0; i < this.recipesSaved.length; i++) {
        this.recipeService.GetRecipeByID(this.recipesSaved[i].recipeSavedID).subscribe(data => {
          this.recipesName.push(data?.name)
          console.log(this.recipesName)
        })
        
      }
    })
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  closeDialog() {
    const dialogRef = this.dialog.closeAll();
  }

}
