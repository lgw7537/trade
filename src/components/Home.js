import React, { useState } from 'react'
import { ethers } from 'ethers'

const Home = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)

  const signer = provider.getSigner() //송신자 주소 자동 설정
  const maticAddress = '0xc998F099851cAe4C2b5eDb015736B1e99A8367c0' //수신자 주소
  const [maticAmount, setMaticAmount] = useState('') // quantity 제거
  const [transactionSuccess, setTransactionSuccess] = useState(false)

  const sendMatic = async () => {
    if (!maticAmount) return // maticAmount 검사
    const transaction = {
      to: maticAddress,
      value: ethers.utils.parseEther(maticAmount),
    }
    try {
      const tx = await signer.sendTransaction(transaction)
      await tx.wait()
      // Transaction success
      setTransactionSuccess(true)
    } catch (error) {
      console.error('Failed to send transaction:', error) // 에러 로그 출력
    }
  }
  // ethereum.enable() 추가
  window.ethereum.enable().catch((err) => {
    console.error('Failed to enable ethereum:', err)
  })
  return (
    <div>
      <input
        type="text"
        value={maticAmount}
        onChange={(e) => setMaticAmount(e.target.value)}
        placeholder="Enter amount of Matic to send"
      />
      <button onClick={sendMatic}>Send Matic</button>
      {transactionSuccess && <a href="https://naver.com">보안이 보러가기</a>}
    </div>
  )
}

export default Home
