import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FuseDrawerModule } from '@kolab/fuse/src/lib/components/drawer';
import { FuseScrollbarModule } from '@kolab/fuse/src/lib/directives/scrollbar';
import { QuickChatComponent } from './quick-chat.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [QuickChatComponent],
  imports: [
    RouterModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FuseDrawerModule,
    FuseScrollbarModule,
    SharedModule,
  ],
  exports: [QuickChatComponent],
})
export class QuickChatModule {}
