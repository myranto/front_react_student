let pause = 5;
let session = 25;

export function changeSate(duration,Pause){
  pause = Pause;
  session = duration;
}
export function getState(){
  return [pause,session];
}
