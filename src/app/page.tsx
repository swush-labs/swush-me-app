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

const availableTokens = [
    { name: 'DOT', balance: '1.5' },
    { name: 'HDX', balance: '0.5' },
    { name: 'USDC', balance: '1000' },
]

export default function Component() {
    const [inputToken, setInputToken] = useState('DOT')
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

    const handleSwap = () => {
        console.log('Swap confirmed')
    }

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute left-1/3 bottom-1/3 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-md w-full bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-lg p-8 space-y-6 relative z-10">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Swap</h1>
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
                    <div className="p-4 bg-white bg-opacity-50 rounded-xl backdrop-blur-sm shadow-md">
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

                    <div className="p-4 bg-white bg-opacity-50 rounded-xl backdrop-blur-sm shadow-md">
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

                <div className="space-y-2">
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
                        <span>{inputToken} → Hydration → {outputToken}</span>
                    </div>
                </div>

                {walletConnected ? (
                    <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all"
                        onClick={handleSwap}
                        disabled={!inputAmount}
                    >
                        Swap
                    </Button>
                ) : (
                    <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all"
                        onClick={() => setWalletConnected(true)}
                    >
                        <Wallet className="mr-2 h-5 w-5" /> Connect Wallet
                    </Button>
                )}
            </div>
        </div>
    )
}