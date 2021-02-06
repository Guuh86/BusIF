import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Idea, IdeaService } from 'src/app/services/idea.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  private selectedSegment: string = 'menu';

  private ideas: Observable<Idea[]>;

  uniqueIdea: any;
  loading: any;

  constructor(
    private ideaService: IdeaService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private auth: AuthService
    ) {}


  ngOnInit() {
    this.loadingIdea();
  }

  async logout(){
    await this.presentLoadingExit();

    try {
      this.auth.logout();
    } catch(error){
      console.log(error);
    } finally{
      this.loading.dismiss();
    }
  }

  async loadingIdea(){
    await this.presentLoading();
    try{
      this.ideas = this.ideaService.getIdeas();
    } catch (error){
      this.presentToast(error.message);
    }finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Carregando conteúdo...' });
    return this.loading.present();
  }

  async presentLoadingExit() {
    this.loading = await this.loadingCtrl.create({ message: 'Saindo...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }


  segmentChanged(ev: any) {
    console.log('Segment changed', ev.target.value);
    this.selectedSegment = ev.target.value
  }
}
