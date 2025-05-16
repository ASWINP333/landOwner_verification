// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

contract Land {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Access Denied");
        _;
    }

    struct LandDetails {
        string documentId;
        string documentName;
        string docType;
        string plotOwner;
        string surveyNumber;
        string plotAddress;
        string branchName;
        address issuedBy;
    }

    mapping(string => LandDetails) public LandDetail;

    function issue(
        string memory _documentUniqueId, 
        string memory _documentId, 
        string memory _documentName,
        string memory _docType,
        string memory _plotOwner,
        string memory _surveyNumber,
        string memory _plotAddress,
        string memory _branchName
    ) public onlyAdmin {
        require(
            bytes(LandDetail[_documentUniqueId].documentName).length == 0,
            "Document ID already exists"
        );

        LandDetail[_documentUniqueId] = LandDetails(
            _documentId, 
            _documentName,
            _docType,
            _plotOwner,
            _surveyNumber,
            _plotAddress,
            _branchName,
            msg.sender
        );
    }

    function getDocuments(string memory _documentUniqueId)
        public
        view
        returns (
            string memory documentId,
            string memory documentName,
            string memory docType,
            string memory plotOwner,
            string memory surveyNumber,
            string memory plotAddress,
            string memory branchName,
            address issuedBy
        )
    {
        LandDetails memory land = LandDetail[_documentUniqueId];

        return (
            land.documentId,
            land.documentName,
            land.docType,
            land.plotOwner,
            land.surveyNumber,
            land.plotAddress,
            land.branchName,
            land.issuedBy
        );
    }
}
