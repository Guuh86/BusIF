import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Idea{
  id?: string,
  title: string,
  dsc: string,
  icon: string
}

@Injectable({
  providedIn: 'root'
})
export class IdeaService {
  private ideas: Observable<Idea[]>;
  private ideaCollection: AngularFirestoreCollection<Idea>;

  constructor(private afs: AngularFirestore) {
    this.ideaCollection = this.afs.collection<Idea>('ideas');
    this.ideas = this.ideaCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc['id'];
          return {id, ...data};
        });
      })
    );
  }

  getIdeas() {
    return this.ideas;
  }

  getIdea(id: string){
    return this.ideaCollection.doc<Idea>(id).valueChanges().pipe(
      take(1),
      map(idea => {
        idea.id = id;
        return idea
      })
    )
  }

  addIdea(idea: Idea): Promise<DocumentReference> {
    return this.ideaCollection.add(idea);
  }

  updateIdea(idea: Idea){
    return this.ideaCollection.doc(idea.id).update({ title: idea.title, dsc: idea.dsc, icon: idea.icon });
  }

  deleteIdea(id: string){
    return this.ideaCollection.doc(id).delete();
  }
}
