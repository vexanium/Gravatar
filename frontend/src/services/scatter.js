import Eos from "vexaniumjs";
import ScatterJS from "scatterjs-core";
import ScatterEOS from "scatterjs-plugin-eosjs";
import config from "../config/default";

ScatterJS.plugins(new ScatterEOS());
const { network } = config;

// `transactionCall` is a function callback.
export default {
  connect: transactionCall => {
    // First we need to connect to the user's Scatter.
    ScatterJS.scatter.connect("VexPhoto").then(connected => {
      // If the user does not have Scatter or it is Locked or Closed this will return false;
      if (!connected) return false;

      const scatter = ScatterJS.scatter;

      // Now we need to get an identity from the user.
      // We're also going to require an account that is connected to the network we're using.
      const requiredFields = { accounts: [network] };
      scatter
        .getIdentity(requiredFields)
        .then(() => {
          // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
          // the user for their account name beforehand. They could still give you a different account.
          const account = scatter.identity.accounts.find(
            x => x.blockchain === "eos"
          );

          // You can pass in any additional options you want into the eosjs reference.
          const eosOptions = { expireInSeconds: 60 };

          // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
          const eos = scatter.eos(network, Eos, eosOptions);

          // ----------------------------
          // Now that we have an identity,
          // an EOSIO account, and a reference
          // to an eosjs object we can send a transaction.
          // ----------------------------

          // Never assume the account's permission/authority. Always take it from the returned account.
          const authorization = [`${account.name}@${account.authority}`];

          /*
                .....
                */
          transactionCall(eos, account, authorization);
        })
        .catch(error => {
          // The user rejected this request, or doesn't have the appropriate requirements.
          console.error(error);
        });
    });
  },

  forget: () => {
    ScatterJS.scatter.forgetIdentity();
  }
};
