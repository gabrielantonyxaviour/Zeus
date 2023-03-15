pragma solidity >=0.4.19;

library LibThunderRNG {
    function rand() internal returns (uint256) {
        uint256[1] memory m;
        assembly {
            if iszero(
                call(
                    not(0),
                    0x8cC9C2e145d3AA946502964B1B69CE3cD066A9C7,
                    0,
                    0,
                    0x0,
                    m,
                    0x20
                )
            ) {
                revert(0, 0)
            }
        }
        return m[0];
    }
}
