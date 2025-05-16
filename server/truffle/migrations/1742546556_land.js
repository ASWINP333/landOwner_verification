const Land = artifacts.require('Land');

const fs = require('fs');

module.exports = function (_deployer) {
  _deployer
    .deploy(Land)
    .then((instance) => {
      const deployer = instance.constructor.class_defaults; // 0x16A68921928C2283266005427a099c008263c6ca

      fs.writeFileSync(
        '../blockchain-services/deployer.json',
        JSON.stringify(deployer, null, 2)
      );
    })
    .catch((error) => {
      console.error(error);
    });
};
