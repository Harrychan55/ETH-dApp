// run.js
const main = async () => {
    //WavePotralコントラクトがコンパイル⇒コントラクトを扱うファイルがartifacts dir以下に生成
    //getContractFactoryはデプロイをサポートするライブラリのアドレスとWavePortalコントラクトの連携を実施
    //const main = async()とawait　これはコードを上から順に実行されない場合を防ぐ。非同期処理問題の対策
    //awaitがついている処理が終わるまでmain関数の他の処理は行われない。
    //getContractFactoryが終わるまでということになる。
    const waveContractFactory = await hre.ethers.getContractFactory("WavePortal");
    //HardhatがローカルのETHネットワークをコントラクトのためだけに作成
    //毎回ローカルサーバーを更新するようにブロックチェーンがリセットされる。
    const waveContract = await waveContractFactory.deploy();
    //WavePortalがデプロイされるのを待っている。
    const wavePortal = await waveContract.deployed();
    
    //コンストラクトのアドレスを出力
    console.log("WavePortal address: ", wavePortal.address);
  };
  
    //runMain 関数が定義されます。この関数は、 main 関数を呼び出し、その結果を待機します。
    //main 関数の処理が正常に完了した場合、プログラムは 0 のステータスコードで終了します。
    //main 関数の処理中にエラーが発生した場合、エラーメッセージがログに出力され、プログラムは 1 のステータスコードで終了します。
    //runMain 関数が呼び出され、プログラムが実行されます。
    const runMain = async () => {
      await main();
       process.exit(0);
    };

  //const runMainを実行する。errorの場合logにerrorと表示し異常終了する。
  runMain();
  runMain().catch((error) => {
    console.log(error);
    process.exit(1);
  });