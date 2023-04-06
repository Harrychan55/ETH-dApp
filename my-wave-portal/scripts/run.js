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
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();