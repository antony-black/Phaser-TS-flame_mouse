import Phaser from "phaser";
import TextureKeys from "../consts/TextureKeys";
import SceneKeys from "../consts/SceneKeys";
import AnimationKeys from "../consts/AnimationKeys";
import RocketMouse from "../game/RocketMouse";

export default class Preloader extends Phaser.Scene {
  private loadingBar!: Phaser.GameObjects.Graphics;
  constructor() {
    super(SceneKeys.PRELOADER);
  }

  preload() {
    const { width, height } = this.scale;
//     this.load.atlas(
//       TextureKeys.RocketMouse,
//       'assets/characters/rocket-mouse.png',
//       'assets/characters/rocket-mouse.json'
//  )

    this.load.atlas(
      TextureKeys.RocketMouse,
      'assets/characters/rocket-mouse.png',
      'assets/characters/rocket-mouse.json'
    )

    //  this.load.setPath('assets/house');
     this.load.image(
          TextureKeys.Background, 
          'assets/house/bg_repeat_340x640.png'
          );

          this.load.image(TextureKeys.MouseHole ,'assets/house/object_mousehole.png');

          this.load.image(TextureKeys.Window1, 'assets/house/object_window1.png');
          this.load.image(TextureKeys.Window2, 'assets/house/object_window2.png');

          this.load.image(TextureKeys.Bookcase1, 'assets/house/object_bookcase1.png');
          this.load.image(TextureKeys.Bookcase2, 'assets/house/object_bookcase2.png');

          this.load.image(TextureKeys.LaserEnd, 'assets/house/object_laser_end.png');
          this.load.image(TextureKeys.LaserMiddle, 'assets/house/object_laser.png');

          this.load.image(TextureKeys.Coin, 'assets/house/object_coin.png');

          //  this.loadingBar = this.add.graphics({
          //   fillStyle: {
          //     color: 0xffffff
          //   }
          // });

          // for (let i = 0; i < 1000000; i++) {
          //   this.load.atlas(
          //     TextureKeys.RocketMouse,
          //     'assets/characters/rocket-mouse.png',
          //     'assets/characters/rocket-mouse.json'
          //   );
          // }

          // this.load.on('progress', (percent: number) => {
          //   this.loadingBar.fillRect(0, height * 0.5, width * percent, 50);
          //   console.log('PERCENT >>>>>', percent);   
          // });

          // // this.load.on('complete', () => {

          // // })

          // this.load.on('load', (file: Phaser.Loader.File) => {
          //   console.log(file.src);
            
          // })
  }
  create() {
      

    this.scene.start(SceneKeys.GAME);
  }
}