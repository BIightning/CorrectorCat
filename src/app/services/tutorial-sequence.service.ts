import { Injectable } from '@angular/core';
import { TutorialSequence } from 'src/assets/classes/tutorialSequence';

@Injectable({
  providedIn: 'root'
})
export class TutorialSequenceService {
  seq: TutorialSequence;

  constructor() {
    this.seq = new TutorialSequence([{
      sceneType: 0,
      catImage: '010-kitty-39',
      slideText: {
        german: 'Hmm, wer bist Du denn? Und was willst Du hier so früh?<br>...<br>Wir haben jetzt einen Termin sagst Du? Unmöglich...',
        english: ' My name is Corrector Cat and I am happy that you’re joining me on my adventure. <br>Let’s sink in into the world of stories. We will read and listen to different stories. <br>But the reader makes many mistakes. <br><br>Help me to correct him,'
          + ' so he can become a purrrfect reader as well.',
        portuguese: ' O meu nome é Gato Corrector e estou feliz por se juntar a mim na minha aventura. <br>Vamo-nos afundar no mundo das histórias. Iremos ler e ouvir diferentes histórias. <br>Mas o leitor comete muitos erros. <br>br>Ajude-me a corrigi-lo,'
          + ' para que também possa tornar-se um leitor perfeito.',
        greek: '(GREEK) My name is Corrector Cat and I am happy that you’re joining me on my adventure. <br>Let’s sink in into the world of stories. We will read and listen to different stories. <br>But the reader makes many mistakes. <br><br>Help me to correct him,'
          + ' so he can become a purrrfect reader as well.'
      },
      widgetID: -1
    }, {
      sceneType: 0,
      catImage: '023-kitty-26',
      slideText: {
        german: 'AHHH, DER TERMIN!<br><br> DAS HABE ICH JA GANZ VERGESSEN!',
        english: 'We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.',
        portuguese: 'Precisamos de lhe mostrar que tipo de erro cometeu. <br>Outra forma, ele não pode melhorar as suas capacidades de leitura. <br>Por conseguinte, vou mostrar-lhe os erros que são cometidos durante a leitura',
        greek: '(GREEK) We need to show him what kind of mistake he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
      },
      widgetID: -1
    },
    {
      sceneType: 2,
      catAnimation: 'cat-move',
      catImage: '050-kitty',
      slideText: {
        german: 'Du bist also der neue Laufbursche...äh...hochgeschätzte Praktikant meine ich natürlich!<br><br>Ich bin Corrector Cat und leite dieses Aufnahmestudio.<br>Erfreut, Dich kennenzulernen!',
        english: 'We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.',
        portuguese: 'Ficou agora a conhecer os tipos de erro. <br> Pode sempre voltar aqui se tiver dúvidas sobre eles.<br> Vemo-nos no jogo!',
        greek: '(GREEK) We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
      },
      widgetID: -1
    },
    {
      sceneType: 1,
      catImage: '052-kitty',
      slideText: {
        german: 'Also... Auf Empfehlung Deines Lehrers habe ich Dich ausnahmsweise als Praktikanten akzeptiert.<br>Sowas mache ich eigentlich nie.<br><br>Du darfst Dich jetzt bedanken!<br><br>Aber nun zu Deinen Aufgaben hier...',
        english: 'We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.',
        portuguese: 'Ficou agora a conhecer os tipos de erro. <br> Pode sempre voltar aqui se tiver dúvidas sobre eles.<br> Vemo-nos no jogo!',
        greek: '(GREEK) We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
      },
      widgetID: -1
    },
    {
      sceneType: 2,
      catImage: '047-kitty-3',
      slideText: {
        german: 'Die Sache ist die: Ein Computervirus hat alle meine Tonaufnahmen gelöscht.<br>Daraufhin habe ich einige neue Sprecher angestellt.<br><br>Die sind aber alle noch sehr unerfahren...',
        english: 'We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.',
        portuguese: 'Ficou agora a conhecer os tipos de erro. <br> Pode sempre voltar aqui se tiver dúvidas sobre eles.<br> Vemo-nos no jogo!',
        greek: '(GREEK) We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
      },
      widgetID: 2
    },
    {
      sceneType: 2,
      catImage: '022-kitty-27',
      slideText: {
        german: '<br>Die meisten Aufnahmen klingen ungefähr so...<br><br>',
        english: 'We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.',
        portuguese: 'Ficou agora a conhecer os tipos de erro. <br> Pode sempre voltar aqui se tiver dúvidas sobre eles.<br> Vemo-nos no jogo!',
        greek: '(GREEK) We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
      },
      widgetID: 4
    },
    {
      sceneType: 0,
      catImage: '047-kitty-3',
      slideText: {
        german: 'Du kannst Dir sicher vorstellen, dass solche Aufnahmen nicht zu gebrauchen sind.<br>Die Sprecher müssen lernen, wie man richtig liest.<br><br>Und da kommst Du ins Spiel.',
        english: 'We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.',
        portuguese: 'Ficou agora a conhecer os tipos de erro. <br> Pode sempre voltar aqui se tiver dúvidas sobre eles.<br> Vemo-nos no jogo!',
        greek: '(GREEK) We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
      },
      widgetID: -1
    },
    {
      sceneType: 0,
      catImage: '051-kitty',
      slideText: {
        german: 'Ich habe leider nicht die Zeit, alle Sprecher zu trainieren.<br> Deshalb zeige ich Dir, was gutes Vorlesen ausmacht.<br><br>Dann kannst Du es den Sprechern beibringen!<br><br>Fangen wir direkt an!',
        english: 'We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.',
        portuguese: 'Ficou agora a conhecer os tipos de erro. <br> Pode sempre voltar aqui se tiver dúvidas sobre eles.<br> Vemo-nos no jogo!',
        greek: '(GREEK) We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
      },
      widgetID: -1
    },
    {
      sceneType: 1,
      catImage: '051-kitty',
      slideText: {
        german: 'Hören wir uns zunächst noch ein paar Beispiele an.<br><br> Vergleiche das Gehörte mit dem Text (Skript) und sag mir, was der Leser falsch gemacht hat.',
        english: 'Hören wir uns zunächst noch ein paar Beispiele an.<br> Vergleiche das Gehörte mit dem Text (Skript) und sag mir, was der Leser falsch gemacht hat.',
        portuguese: 'Ficou agora a conhecer os tipos de erro. <br> Pode sempre voltar aqui se tiver dúvidas sobre eles.<br> Vemo-nos no jogo!',
        greek: '(GREEK) We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
      },
      widgetID: 3
    },
    {
      sceneType: 2,
      catImage: '036-kitty-14',
      slideText: {
        german: 'Super, damit hätten wir die Grundlagen geklärt.<br><br>Legen wir direkt mit einem richtigen Text los!',
        english: 'Hören wir uns zunächst noch ein paar Beispiele an.<br> Vergleiche das Gehörte mit dem Text (Skript) und sag mir, was der Leser falsch gemacht hat.',
        portuguese: 'Ficou agora a conhecer os tipos de erro. <br> Pode sempre voltar aqui se tiver dúvidas sobre eles.<br> Vemo-nos no jogo!',
        greek: '(GREEK) We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
      },
      widgetID: 0
    },
    {
      sceneType: 3,
      catImage: '051-kitty',
      slideText: {
        german: 'Hören wir uns zunächst noch ein paar Beispiele an.<br><br> Vergleiche das Gehörte mit dem Text (Skript) und sag mir, was der Leser falsch gemacht hat.',
        english: 'Hören wir uns zunächst noch ein paar Beispiele an.<br> Vergleiche das Gehörte mit dem Text (Skript) und sag mir, was der Leser falsch gemacht hat.',
        portuguese: 'Ficou agora a conhecer os tipos de erro. <br> Pode sempre voltar aqui se tiver dúvidas sobre eles.<br> Vemo-nos no jogo!',
        greek: '(GREEK) We need to show him what kind of mistakes he has made. <br>Otherwise he can’t improve his reading skills. <br> Therefore, I am going to show you errors which are made while reading.'
      },
      widgetID: 5
    }], 1);
  }

  public getSequence(level: number): TutorialSequence {
    //todo: get real obj from database
    return this.seq;
  }
}
