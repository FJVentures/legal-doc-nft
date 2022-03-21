import { createSelector } from 'reselect'
import { get } from 'lodash'

const web3 = state => get(state, 'web3.connection')
export const web3Selector = createSelector(web3, w => w)

const network = state => get(state, 'web3.network')
export const networkSelector = createSelector(network, n => n)

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const balance = state => get(state, 'web3.balance', 0)
export const balanceSelector = createSelector(balance, e => e)

const contract = state => get(state, 'contract.contract')
export const contractSelector = createSelector(contract, c => c)

const metadata = state => get(state, 'contract.metadata')
export const metadataSelector = createSelector(metadata, m => m)

const legalDocState = state => get(state, 'contract.state')
export const legalDocStateSelector = createSelector(legalDocState, s => s)

const metadataLoaded= state => get(state, 'contract.loaded', false)
export const metadataLoadedSelector = createSelector(metadataLoaded, l => l)

const legalDocStateLoaded = state => get(state, 'contract.state', false)
export const legalDocStateLoadedSelector = createSelector(legalDocStateLoaded, b => b)