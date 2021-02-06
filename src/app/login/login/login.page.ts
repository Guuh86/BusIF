import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: Observable<firebase.default.User>

  private selectedSegment: string = 'aluno';
  private loading: any;

  email: string;
  password: string;


  constructor(
    public auth: AuthService,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.auth.getAuth();
  }

  async loginComoAluno(){
    await this.presentLoading();

    try {
      this.auth.loginAluno(this.email, this.password);
      this.email = this.password = '';
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  async loginComoMotorista(){
    await this.presentLoading();
    
    try{
      this.auth.loginMotorista(this.email, this.password);
      this.email = this.password = '';
    } catch(error){
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.target.value);
    this.selectedSegment = ev.target.value
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({ message: 'Entrando...' });
    return this.loading.present();
  }

}
