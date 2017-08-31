const Component = require('react').Component
const h = require('react-hyperscript')
const inherits = require('util').inherits
const connect = require('react-redux').connect
const actions = require('../../actions')
const Dropdown = require('./components/dropdown').Dropdown
const DropdownMenuItem = require('./components/dropdown').DropdownMenuItem

function mapStateToProps (state) {
  return {
    provider: state.metamask.provider,
    frequentRpcList: state.metamask.frequentRpcList || [],
    networkDropdownOpen: state.appState.networkDropdownOpen,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    hideModal: () => {
      dispatch(actions.hideModal())
    },
    setProviderType: (type) => {
      dispatch(actions.setProviderType(type))
    },
    setDefaultRpcTarget: type => {
      dispatch(actions.setDefaultRpcTarget(type))
    },
    setRpcTarget: (target) => {
      dispatch(actions.setRpcTarget(target))
    },
    showConfigPage: () => {
      dispatch(actions.showConfigPage())
    },
    showNetworkDropdown: () => { dispatch(actions.showNetworkDropdown()) },
    hideNetworkDropdown: () => { dispatch(actions.hideNetworkDropdown()) },
  }
}


inherits(NetworkDropdown, Component)
function NetworkDropdown () {
  Component.call(this)
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(NetworkDropdown)

// TODO: specify default props and proptypes
NetworkDropdown.prototype.render = function () {
  const props = this.props
  const { provider: { type: providerType, rpcTarget: activeNetwork } } = props
  const rpcList = props.frequentRpcList
  const isOpen = this.props.networkDropdownOpen
  const dropdownMenuItemStyle = {
    fontFamily: 'DIN OT',
    fontSize: '16px',
    lineHeight: '20px',
  };

  return h(Dropdown, {
    useCssTransition: true,
    isOpen,
    onClickOutside: (event) => {
      const { classList } = event.target
      const isNotToggleElement = [
        classList.contains('menu-icon'),
        classList.contains('network-name'),
        classList.contains('network-indicator'),
      ].filter(bool => bool).length === 0
      // classes from three constituent nodes of the toggle element

      if (isNotToggleElement) {
        this.props.hideNetworkDropdown()
      }
    },
    zIndex: 11,
    style: {
      position: 'absolute',
      right: '2px',
      top: '38px',
      minWidth: '309px',
    },
    innerStyle: {
      padding: '10px 8px',
    },
  }, [

    h(
      DropdownMenuItem,
      {
        key: 'main',
        closeMenu: () => this.props.hideNetworkDropdown(),
        onClick: () => props.setProviderType('mainnet'),
        style: dropdownMenuItemStyle,
      },
      [
        providerType === 'mainnet' ? h('.network-check', '✓') : h('.network-check__transparent', '✓'),
        h('.menu-icon.diamond'),
        h('span.network-name', {
          style: {
            color: providerType === 'mainnet' ? '#ffffff' : '#9b9b9b'
          },
        }, 'Main Ethereum Network'),
      ]
    ),

    h(
      DropdownMenuItem,
      {
        key: 'ropsten',
        closeMenu: () => this.props.hideNetworkDropdown(),
        onClick: () => props.setProviderType('ropsten'),
        style: dropdownMenuItemStyle,
      },
      [
        providerType === 'ropsten' ? h('.network-check', '✓') : h('.network-check__transparent', '✓'),
        h('.menu-icon.red-dot'),
        h('span.network-name', {
          style: {
            color: providerType === 'ropsten' ? '#ffffff' : '#9b9b9b'
          },
        }, 'Ropsten Test Network'),
      ]
    ),

    h(
      DropdownMenuItem,
      {
        key: 'kovan',
        closeMenu: () => this.props.hideNetworkDropdown(),
        onClick: () => props.setProviderType('kovan'),
        style: dropdownMenuItemStyle,
      },
      [
        providerType === 'kovan' ? h('.network-check', '✓') : h('.network-check__transparent', '✓'),
        h('.menu-icon.hollow-diamond'),
        h('span.network-name', {
          style: {
            color: providerType === 'kovan' ? '#ffffff' : '#9b9b9b'
          },
        }, 'Kovan Test Network'),
      ]
    ),

    h(
      DropdownMenuItem,
      {
        key: 'rinkeby',
        closeMenu: () => this.props.hideNetworkDropdown(),
        onClick: () => props.setProviderType('rinkeby'),
<<<<<<< HEAD
        style: {
          fontSize: '18px',
        },
=======
        style: dropdownMenuItemStyle,
>>>>>>> Fix menu style
      },
      [
        providerType === 'rinkeby' ? h('.network-check', '✓') : h('.network-check__transparent', '✓'),
        h('.menu-icon.golden-square'),
        h('span.network-name', {
          style: {
            color: providerType === 'rinkeby' ? '#ffffff' : '#9b9b9b'
          },
        }, 'Rinkeby Test Network'),
      ]
    ),

    h(
      DropdownMenuItem,
      {
        key: 'default',
        closeMenu: () => this.props.hideNetworkDropdown(),
        onClick: () => props.setDefaultRpcTarget(),
        style: dropdownMenuItemStyle,
      },
      [
        activeNetwork === 'http://localhost:8545' ? h('.network-check', '✓') : h('.network-check__transparent', '✓'),
        h('i.fa.fa-question-circle.fa-lg.menu-icon'),
        h('span.network-name', {
          style: {
            color: activeNetwork === 'http://localhost:8545' ? '#ffffff' : '#9b9b9b'
          },
        }, 'Localhost 8545'),
      ]
    ),

    this.renderCustomOption(props.provider),
    this.renderCommonRpc(rpcList, props.provider),

    h(
      DropdownMenuItem,
      {
        closeMenu: () => this.props.hideNetworkDropdown(),
        onClick: () => this.props.showConfigPage(),
        style: dropdownMenuItemStyle,
      },
      [
        activeNetwork === 'custom' ? h('.check', '✓') : h('.network-check__transparent', '✓'),
        h('i.fa.fa-question-circle.fa-lg.menu-icon'),
        h('span.network-name', {
          style: {
            color: activeNetwork === 'custom' ? '#ffffff' : '#9b9b9b'
          },
        }, 'Custom RPC'),
      ]
    ),

  ])
}


NetworkDropdown.prototype.getNetworkName = function () {
  const { provider } = this.props
  const providerName = provider.type

  let name

  if (providerName === 'mainnet') {
    name = 'Main Ethereum Network'
  } else if (providerName === 'ropsten') {
    name = 'Ropsten Test Network'
  } else if (providerName === 'kovan') {
    name = 'Kovan Test Network'
  } else if (providerName === 'rinkeby') {
    name = 'Rinkeby Test Network'
  } else {
    name = 'Unknown Private Network'
  }

  return name
}

NetworkDropdown.prototype.renderCommonRpc = function (rpcList, provider) {
  const props = this.props
  const rpcTarget = provider.rpcTarget

  return rpcList.map((rpc) => {
    if ((rpc === 'http://localhost:8545') || (rpc === rpcTarget)) {
      return null
    } else {
      return h(
        DropdownMenuItem,
        {
          key: `common${rpc}`,
          closeMenu: () => this.props.hideNetworkDropdown(),
          onClick: () => props.setRpcTarget(rpc),
        },
        [
          h('i.fa.fa-question-circle.fa-lg.menu-icon'),
          rpc,
          rpcTarget === rpc ? h('.check', '✓') : null,
        ]
      )
    }
  })
}

NetworkDropdown.prototype.renderCustomOption = function (provider) {
  const { rpcTarget, type } = provider
  const props = this.props

  if (type !== 'rpc') return null

  // Concatenate long URLs
  let label = rpcTarget
  if (rpcTarget.length > 31) {
    label = label.substr(0, 34) + '...'
  }

  switch (rpcTarget) {

    case 'http://localhost:8545':
      return null

    default:
      return h(
        DropdownMenuItem,
        {
          key: rpcTarget,
          onClick: () => props.setRpcTarget(rpcTarget),
          closeMenu: () => this.props.hideNetworkDropdown(),
        },
        [
          h('i.fa.fa-question-circle.fa-lg.menu-icon'),
          label,
          h('.check', '✓'),
        ]
      )
  }
}