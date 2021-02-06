import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Idea, IdeaService } from 'src/app/services/idea.service';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.page.html',
  styleUrls: ['./alerta.page.scss'],
})
export class AlertaPage implements OnInit {
  private selectedSegment: string = 'menu';

  idea: Idea = {
    title: '',
    dsc: '',
    icon: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private ideaService: IdeaService,
    private toastCtrl: ToastController,
    private router: Router
    ) {

  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.ideaService.getIdea(id).subscribe(idea => {
        this.idea = idea;
      })
    }
  }

  addIdea(){
    this.ideaService.addIdea(this.idea).then(() => {
      this.router.navigate(['/motorista-menu']);
      this.showToast('Alerta adicionado e enviado!');
    }, err => {
      this.showToast('Ocorreu um problema ao adicionar um alerta!');
    });
  }

  updateIdea(){
    this.ideaService.updateIdea(this.idea).then(() => {
      this.router.navigate(['/motorista-menu']);
      this.showToast('Alerta atualizado!');
    }, err => {
      this.showToast('Ocorreu um problema ao atualizar o alerta!')
    })
  }

  deleteIdea() {
    this.ideaService.deleteIdea(this.idea.id).then(() => {
      this.router.navigate(['/motorista-menu']);
      this.showToast('Alerta deletado!');
    }, err => {
      this.showToast('Ocorreu um problema ao deletar o alerta!');
    });
  }

  showToast(msg) {
    this.toastCtrl.create({
      message: msg,
      duration: 2000
    }).then(toast => toast.present());
  }

}
