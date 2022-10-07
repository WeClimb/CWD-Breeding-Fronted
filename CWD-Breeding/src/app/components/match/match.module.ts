import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchComponent } from './match.component';

@NgModule({
  declarations: [MatchComponent],
  exports: [
    MatchComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MatchModule { }

