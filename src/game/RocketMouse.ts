import Phaser, { Scene } from "phaser";
import TextureKeys from "../consts/TextureKeys";
import AnimationKeys from "../consts/AnimationKeys";
import SceneKeys from "../consts/SceneKeys";
enum MouseState {
  Running,
  Killed,
  Dead
}
export default class RocketMouse extends Phaser.GameObjects.Container {
  private mouseState = MouseState.Running;
  mouse: Phaser.GameObjects.Sprite;
  flame: Phaser.GameObjects.Sprite;
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y);

    this.mouse = scene.add.sprite(0, 0, TextureKeys.RocketMouse)
                 .setOrigin(0.5, 1);
                              

    this.flame = scene.add.sprite(-63, -15, TextureKeys.RocketMouse);

    this.createAnimation();

    this.mouse.play(AnimationKeys.RocketMouseRun, true);
    this.flame.play(AnimationKeys.RocketFlameOn, true);

    this.enableJetPack(false);            

    this.add(this.flame);
    this.add(this.mouse);

    scene.physics.add.existing(this);

    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setSize(this.mouse.width * 0.5, this.mouse.height * 0.8);
    body.setOffset(-this.mouse.width * 0.3, -this.mouse.height + 10);

    this.cursors = scene.input.keyboard.createCursorKeys();
  }
  createAnimation() {
    this.mouse.anims.create({
      key: AnimationKeys.RocketMouseFly,
      frames: [{
        key: TextureKeys.RocketMouse,
        frame: 'rocketmouse_fly01.png'
      }],
      frameRate: 10,
      repeat: -1
    });

    this.mouse.anims.create({
      key: AnimationKeys.RocketMouseFall,
      frames: [{
        key: TextureKeys.RocketMouse,
        frame: 'rocketmouse_fall01.png'
      }],
      frameRate: 10,
      repeat: -1
    });

    this.mouse.anims.create({
      key: AnimationKeys.RocketMouseRun,
      frames: this.mouse.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 4,
        prefix: 'rocketmouse_run',
        zeroPad: 2,
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });

    this.mouse.anims.create({
      key: AnimationKeys.RocketMouseRun,
      frames: this.mouse.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: 'flame',
        suffix: '.png'
      }),
      frameRate: 10,
      repeat: -1
    });

    this.mouse.anims.create({
      key: AnimationKeys.RocketMouseDead,
      frames: this.mouse.anims.generateFrameNames(TextureKeys.RocketMouse, {
        start: 1,
        end: 2,
        prefix: 'rocketmouse_dead',
        zeroPad: 2,
        suffix: '.png'
      }),
      frameRate: 10,
    });
  }
 kill() {
  if (this.mouseState !== MouseState.Running) {
    return
  }

  this.mouseState = MouseState.Killed;

  this.mouse.play(AnimationKeys.RocketMouseDead, true);

  const body = this.body as Phaser.Physics.Arcade.Body;
  body
      .setAccelerationY(0)
      .setVelocity(1000, 0);
  this.enableJetPack(false);
 }
  enableJetPack(enabled: boolean) {
    this.flame.setVisible(enabled)
  }
  preUpdate() {
    const body = this.body as Phaser.Physics.Arcade.Body;

    switch(this.mouseState) {

      case MouseState.Running: {
    if (this.cursors.space.isDown) {
      body.setAccelerationY(-1000);
      this.enableJetPack(true);
      this.mouse.play(AnimationKeys.RocketMouseFly, true)
    }
    else {
      body.setAccelerationY(0);
      this.enableJetPack(false);
    }

    if (body.blocked.down) {
      this.mouse.play(AnimationKeys.RocketMouseRun, true);
    }
    else if (body.velocity.y > 0) {
      this.mouse.play(AnimationKeys.RocketMouseFall, true);
    }
    break;
      }

      case MouseState.Killed: {
        body.velocity.x *= 0.99

        if (body.velocity.x <= 5) {
          this.mouseState = MouseState.Dead;
        }
        break;
      }

      case MouseState.Dead: {
        body.setVelocity(0, 0);

        this.scene.scene.run(SceneKeys.GameOver);

        break;
      }
    }
  }
}