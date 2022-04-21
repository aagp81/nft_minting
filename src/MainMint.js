import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import { 
    Box, 
    Button, 
    Flex, 
    Input, 
    Text, 
    Select } from '@chakra-ui/react';
import LayerZeroNoahNFT from './LayerZeroNoahNFT.json';

var LayerZeroNoahNFTAddress = "";
var totalNFT = "";
handleTotalSupply();




async function handleTotalSupply() {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(
            "0x4899Dfb873C64f841908e5ac5d66A338843c8f5f",
            LayerZeroNoahNFT.abi,
            provider
        );
        const totalSupply = await contract.totalSupply();
        const maxMint = await contract.maxMint();
        totalNFT = parseInt(totalSupply._hex, 16) + '/' + parseInt(maxMint._hex, 16);
}



const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);
    const [selects, setSelects] = useState();
    const [mintResult, setMintResult] = useState();
    LayerZeroNoahNFTAddress = selects;





    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                LayerZeroNoahNFTAddress,
                LayerZeroNoahNFT.abi,
                signer
            );


            try {
                const response = await contract.mint(BigNumber.from(mintAmount));
                setMintResult('Success. TRX hash :' + response.hash + '. Check your  NFT at https://tofunft.com/');
                console.log('response: ', response);
            } catch (err) {
                alert('Failed: the NFT was not minted. Error: ' + err.message);
                setMintResult('Transaction failed: Try again, check you MetaMask network or use another wallet. ' + err.data.message);
                console.log("error: ", err.message);
            }
        }
    }


    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    };

    const handleIncrement = () => {
        if (mintAmount >= 2) return;
        setMintAmount(mintAmount + 1);
    };

 


    return (
        <Flex justify="center"  align="center" height="100vh" paddingBottom="150px">
            <Box width="520px">
                <div>
                    <Text fontSize="48px" textShadow="0 5px #000000">LayerZero Noah NFT</Text>
                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >Noah's Journey have 1,100 NFTs with different levels of rarity on LayerZero Omnichain (Multiple Blockchains)</Text>
                    
                </div>
                
                    <Select 
                        placeholder='Select your blockchain'
                        justify="center"
                        align="center"
                        readOnly
                        fontFamily="inherit"
                        width="100px"
                        height="40%"
                        textAlign="center"
                        type="text" 
                        value={selects}
                        onChange={e=> (setSelects(e.target.value))}
                    >
                        <option value='0x4899Dfb873C64f841908e5ac5d66A338843c8f5f'>Ethereum</option>
                        <option value='0xa1aF20eEcb3961dE5015fC2CC72a3EA12bFd4995'>Polygon</option>
                        <option value='0x4bfcA089761a26057801292434e682a1CD9Ecc93'>BSC chain</option>
                        <option value='0x46d04072e9B682a5Caa865EB6a08506FF5320fe0'>Avalanche</option>
                        <option value='0x05B5f052eEa608E6336316F9e1d149CBa31a9a0B'>Fantom</option>
                        <option value='0x46d04072e9B682a5Caa865EB6a08506FF5320fe0'>Optimism</option>
                        <option value='option7'>Arbitrum</option>
                    </Select>

                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >Total Supply : {totalNFT}</Text>

                    <Text 
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 2px 2px #000000"
                    >{mintResult}</Text>

                

                {isConnected ? (

                    <div>
                        <Flex align="center" justify="center">
                            <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px"
                            onClick={handleDecrement}>-</Button>
                            
                            <Input 
                            readOnly
                            fontFamily="inherit"
                            width="100px"
                            height="40%"
                            textAlign="center"
                            paddingLeft="19px"
                            marginTop="10px"
                            type="number" 
                            value={mintAmount} />

                            <Button 
                            backgroundColor="#D6517D"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop="10px" 
                            onClick={handleIncrement}>+</Button>
                        </Flex>

                        <Button
                        backgroundColor="#D6517D"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="inherit"
                        padding="15px"
                        onClick={handleMint}>Mint Now</Button>
                    </div>
                    ) : (

                        <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="VT323"
                        textShadow="0 3px #000000"
                        color="#D6517D"
                        >You must be connected to Mint.</Text>
                    )}
            </Box>
        </Flex>
    )

};
        
export default MainMint;


