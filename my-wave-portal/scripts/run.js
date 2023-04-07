// run.js
const main = async () => {
    //hre.ethers.getSigners()はHardhatが提供する任意のアドレスを返す関数
    //コントラクト所有者（＝あなた）のウォレットアドレスと、あなたに「👋（wave）」を送るユーザーのウォレットアドレスを
    //Hardhatがそれぞれ生成しownerとrandomPersonという変数に格納しています。
    const [owner, randomPerson1, randomPerson2] = await hre.ethers.getSigners();
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
    console.log("Contract deployed to:", wavePortal.address);
    //waveportalをデプロイした人のアドレス
    console.log("Contract deployed by:", owner.address);
    
    //var でなくletとすることでローカル変数
    let waveCount;
    //waveContract.getTotalWaves() waveportal.solのgetTotalWaves()を読み出し既存のwaveの総数を取得
    waveCount = await waveContract.getTotalWaves();
    // waveTxnローカル変数 は wave関数がプロックチェーン上に＋waveするため取引認証を行うあいだawaitする。
    let waveTxn = await waveContract.wave();
    //認証後、トランザクションの結果を取得する
    await waveTxn.wait();
    //wave count を再度取得して確認。 
    waveCount = await waveContract.getTotalWaves();

    //ramdomperson Hardhatが取得したアドレスが格納されている。
    //connect(randomPerson)でほかのユーザーでwaveする
    waveTxn = await waveContract.connect(randomPerson1).wave();
    //randomperson のwaveの承認をまつ。
    await waveTxn.wait();
    //wave count を再度取得して確認。
    waveCount = await waveContract.getTotalWaves();

    //ramdomperson Hardhatが取得したアドレスが格納されている。
    //connect(randomPerson)でほかのユーザーがownerにwaveする
    waveTxn = await waveContract.connect(randomPerson2).wave();
    //randomperson のwaveの承認をまつ。
    await waveTxn.wait();
    //wave count を再度取得して確認。
    waveCount = await waveContract.getTotalWaves();
  };
  
    //runMain 関数が定義されます。この関数は、 main 関数を呼び出し、その結果を待機します。
    //main 関数の処理が正常に完了した場合、プログラムは 0 のステータスコードで終了します。
    //main 関数の処理中にエラーが発生した場合、エラーメッセージがログに出力され、プログラムは 1 のステータスコードで終了します。
    //runMain 関数が呼び出され、プログラムが実行されます。
    const runMain = async () => {
        try {
          await main();
          process.exit(0);
        } catch (error) {
          console.log(error);
          process.exit(1);
        }
      };

  //const runMainを実行する。
  runMain();
