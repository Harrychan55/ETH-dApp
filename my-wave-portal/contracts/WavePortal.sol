// WavePortal.sol
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import "hardhat/console.sol";

contract WavePortal {
    //uint256 符号なし整数のデータ型
    //totalWaves 状態変数　コントラクトのストレージに永続的に保存
    uint256 totalWaves;

    constructor() {
        console.log("Here is my first smart contract!");
    }
    //wave()関数の追加。　publicはどこからでも読み出し可能
    function wave() public {
        //tatalWaves　の変数にwave()実行時　+1する
        totalWaves += 1;
        //%がwaveしたことをログ出力。
        //msg.sender は関数を呼び出した人=you のウォレットアドレスを返す
        //スマコンに含まれる関数を呼び出すには有効なウォレット接続が必要で、誰がmsg.senderは関数を
        //呼び出したかを正確に把握し、ユーザー認証を行っている。
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }
}