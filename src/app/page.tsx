"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Label } from "@/components/ui/label"
import { ArrowDownIcon, Settings, Info, Wallet } from 'lucide-react'
import TokenSelectorDialog from '@/components/TokenSelectorDialog'



export default function Component() {
  const [inputToken, setInputToken] = useState('ETH')
  const [outputToken, setOutputToken] = useState('USDC')
  const [inputAmount, setInputAmount] = useState('')
  const [outputAmount, setOutputAmount] = useState('')
  const [slippageTolerance, setSlippageTolerance] = useState(0.5)
  const [transactionDeadline, setTransactionDeadline] = useState(20)
  const [walletConnected, setWalletConnected] = useState(false)

  const handleInputChange = (value: string) => {
    setInputAmount(value)
    setOutputAmount((parseFloat(value) * 1800).toFixed(2))
  }

  const availableTokens = [
    { name: 'ETH', balance: '1.5' },
    { name: 'BTC', balance: '0.5' },
    { name: 'USDC', balance: '1000' },
  ]

  const handleSwap = () => {
    console.log('Swap confirmed')
  }

  return (
    // add margin top
    <div className="max-w-md mt-10 mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Swap</h1>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-blue-500 hover:text-purple-500 transition-colors">
                  <Info className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Trade tokens in an instant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="text-blue-500 hover:text-purple-500 transition-colors">
                <Settings className="h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Advanced Settings</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="slippage" className="text-right">
                    Slippage tolerance
                  </Label>
                  <Input
                    id="slippage"
                    type="number"
                    value={slippageTolerance}
                    onChange={(e) => setSlippageTolerance(parseFloat(e.target.value))}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="deadline" className="text-right">
                    Transaction deadline
                  </Label>
                  <Input
                    id="deadline"
                    type="number"
                    value={transactionDeadline}
                    onChange={(e) => setTransactionDeadline(parseInt(e.target.value))}
                    className="col-span-3"
                  />
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-white bg-opacity-50 rounded-xl backdrop-blur-sm">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">You pay</span>
          </div>
          <Input
            type="number"
            value={inputAmount}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="0.0"
            className="border-none text-2xl bg-transparent"
          />
          <TokenSelectorDialog
            selectedToken={{ name: inputToken, balance: '1.5' }}
            onSelectToken={(token) => setInputToken(token.name)}
            availableTokens={availableTokens}
          />
        </div>

        <div className="flex justify-center">
          <Button variant="ghost" size="icon" className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-lg transition-all">
            <ArrowDownIcon className="h-6 w-6" />
          </Button>
        </div>

        <div className="p-4 bg-white bg-opacity-50 rounded-xl backdrop-blur-sm">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">You receive</span>
          </div>
          <Input
            type="number"
            value={outputAmount}
            readOnly
            placeholder="0.0"
            className="border-none text-2xl bg-transparent"
          />
          <TokenSelectorDialog
            selectedToken={{ name: outputToken, balance: '1000' }}
            onSelectToken={(token) => setOutputToken(token.name)}
            availableTokens={availableTokens}
          />
        </div>
      </div>

      <div className="mt-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Exchange rate</span>
          <span>1 {inputToken} = 1800 {outputToken}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Network fee</span>
          <span>~$5.00</span>
        </div>
        <div className="flex justify-between text-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help text-muted-foreground">Route</span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Best route for your trade</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span>{inputToken} → Uniswap V3 → {outputToken}</span>
        </div>
      </div>

      {walletConnected ? (
        <Button
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          onClick={handleSwap}
          disabled={!inputAmount}
        >
          Swap
        </Button>
      ) : (
        <Button
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          onClick={() => setWalletConnected(true)}
        >
          <Wallet className="mr-2 h-5 w-5" /> Connect Wallet
        </Button>
      )}
    </div>
  )
}