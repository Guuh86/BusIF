import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea, IdeaService } from 'src/app/services/idea.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private selectedSegment: string = 'menu';
  private loading: any;

  private ideas: Observable<Idea[]>;

  constructor(private ideaService: IdeaService, private auth: AuthService, public loadingCtrl: LoadingController ) {}

  ngOnInit() {
    this.ideas = this.ideaService.getIdeas();
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.target.value);
    this.selectedSegment = ev.target.value
  }

  async logout(){
    await this.presentLoadingExit();

    try{
      this.auth.logout();
    } catch (error){
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoadingExit() {
    this.loading = await this.loadingCtrl.create({ message: 'Saindo...' });
    return this.loading.present();
  }
}
