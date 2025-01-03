import React, { useState,useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FaMagnifyingGlass } from "react-icons/fa6";
import StatusModal from "../../components/Modals/statusModal";
import { HandleChange, HandleChangeDigitsOnly, HandleChangeTextOnly, ResetFormData } from '../../components/Validations'; 
import { useTranslation } from 'react-i18next';
import { accountTypeCol, registerSubscriber } from "../../api/subscriber";

const RegisterSubscriber = () => {

  const [accounts, setAccounts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccountTypes = async () => {
      setLoading(true);
      try {
        const result = await accountTypeCol();
        if (result.success) {
          const parsedAccounts = JSON.parse(result.account);
          console.log(parsedAccounts)
          if (Array.isArray(parsedAccounts)) {
            setAccounts(parsedAccounts); 

          } else {
            setError('Invalid account data format');
          }
        } else {
          setError(result.message || 'Invalid data format');
        }
      } catch (err) {
        setError(err.message); // Handle fetch errors
      } finally {
        setLoading(false);
      }
    };
  
    fetchAccountTypes();
  }, []);
  
  

  const initialFormData = {
    nickname: "",
    mobileNumber: "",
    accountType: "",
    accountStatus: "",
    firstName: "",
    secondName: "",
    lastName: "",
    nationality: "",
    dateOfBirth: "",
    placeOfBirth: "",
    gender: "",
    idNumber: "",
    idDescription: "",
    idExpiry: "",
    company: "",
    profession: "",
    email: "",
    alternateNumber: "",
    buildingNumber: "",
    streetName: "",
    cityVillage: "",
    region: "",
    country: "",
  };
  
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState(initialFormData);

  const [modalState, setModalState] = useState({
    isOpen: false,
    status: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simulate form submission success or failure
    const isFormValid =
      formData.nickname &&
      formData.mobileNumber &&
      formData.accountType &&
      formData.accountStatus &&
      formData.firstName &&
      formData.lastName;
      console.log('register account',formData)
      if (isFormValid) {
        const response = await registerSubscriber(formData);
        console.log(response);
        if(response.success){
          setModalState({
            isOpen: true,
            status: "success",
            message: "Added User Successfully!",
          });
          ResetFormData(setFormData, initialFormData)();
       }else{
          setModalState({
            isOpen: true,
            status: "error",
            message: "Failed to Add User. Please try again.",
          });
       }
        
      } else {
        setModalState({
          isOpen: true,
          status: "error",
          message: "Failed to Add User. Please try again.",
        });
      }
    };

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center">
          <FaMagnifyingGlass className="text-[#D95F08] mr-2" />
          {t('registration_form')}
        </h2>

        {/* Account Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#23587C]">
          {t('account_information')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="nickname"
              >
                {t('nickname')}
              </label>
              <input
                type="text"
                name="nickname"
                id="nickname"
                value={formData.nickname.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder={t('nickname')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="mobileNumber"
              >
                {t('authorized_mobile_number')}
              </label>
              <input
                type="text"
                name="mobileNumber"
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={HandleChangeDigitsOnly(setFormData)}
                placeholder={t('authorized_mobile_number')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                maxLength={15}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="accountType"
              >
                {t('account_type')}
              </label>
              <select
                name="accountType"
                id="accountType"
                value={formData.accountType.toUpperCase()}
                onChange={HandleChange(setFormData)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              >
                <option value="">Select Account Type</option>
                {accounts.map((account) => (
                  <option key={account.ACCOUNTTYPEID} value={account.ACCOUNTTYPE.toUpperCase()}>
                    {account.ACCOUNTTYPE === 'TEMP1' ? 'TEMPORARY_NEW' : account.DESCRIPTION}
                  </option>
                ))}
              </select>


            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="accountStatus"
              >
                {t('account_status')}
              </label>
              <select
                disabled
                name="accountStatus"
                id="accountStatus"
                value=""
                onChange={HandleChange(setFormData)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              >
                <option className="hover:bg-black" value="">
                  Deactive
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#23587C]">
          {t('personal_information')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="firstName"
              >
                {t('first_name')}
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={formData.firstName.toUpperCase()}
                onChange={HandleChangeTextOnly(setFormData)}
                placeholder={t('first_name')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="secondName"
              >
                {t('second_name')}
              </label>
              <input
                type="text"
                name="secondName"
                id="secondName"
                value={formData.secondName.toUpperCase()}
                onChange={HandleChangeTextOnly(setFormData)}
                placeholder={t('second_name')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="lastName"
              >
                {t('last_name')}
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={formData.lastName.toUpperCase()}
                onChange={HandleChangeTextOnly(setFormData)}
                placeholder={t('last_name')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="nationality"
              >
                {t('nationality')}
              </label>
              <input
                type="text"
                name="nationality"
                id="nationality"
                value={formData.nationality.toUpperCase()}
                onChange={HandleChangeTextOnly(setFormData)}
                placeholder={t('nationality')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="dateOfBirth"
              >
                {t('date_of_birth')}
              </label>
              <input
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                value={
                  formData.dateOfBirth
                    ? formData.dateOfBirth.split('/').reverse().join('-') // Convert DD/MM/YYYY to YYYY-MM-DD
                    : ''
                }
                onChange={HandleChange(setFormData)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="placeOfBirth"
              >
                {t('place_of_birth')}
              </label>
              <input
                type="text"
                name="placeOfBirth"
                id="placeOfBirth"
                value={formData.placeOfBirth.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder={t('place_of_birth')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="gender"
              >
                {t('gender')}
              </label>
              <select
                name="gender"
                id="gender"
                value={formData.gender.toUpperCase()}
                onChange={HandleChange(setFormData)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="idNumber"
              >
                {t('id_number')}
              </label>
              <input
                type="text"
                name="idNumber"
                id="idNumber"
                value={formData.idNumber}
                onChange={HandleChangeDigitsOnly(setFormData)}
                placeholder={t('id_number')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="idDescription"
              >
                {t('id_description')}
              </label>
              <input
                type="text"
                name="idDescription"
                id="idDescription"
                value={formData.idDescription.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder={t('id_description')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="idExpiry"
              >
                {t('id_expiry_date')}
              </label>
              <input
                type="date"
                name="idExpiry"
                id="idExpiry"
                value={
                  formData.idExpiry
                    ? formData.idExpiry.split('/').reverse().join('-') // Convert DD/MM/YYYY to YYYY-MM-DD
                    : ''
                }
                onChange={HandleChange(setFormData)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="country"
              >
                {t('country')}
              </label>
              <select
              type="text"
              name="country"
              id="country"
              value={formData.country.toUpperCase()}
              onChange={HandleChange(setFormData)}
              placeholder={t('country')}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              >
                <option value="" selected disabled>Please Select Country</option>
                <option value="AFGHANISTAN">AFGHANISTAN</option>
                <option value="ÅLAND ISLANDS">ÅLAND ISLANDS</option>
                <option value="ALBANIA">ALBANIA</option>
                <option value="ALGERIA">ALGERIA</option>
                <option value="AMERICAN SAMOA">AMERICAN SAMOA</option>
                <option value="ANDORRA">ANDORRA</option>
                <option value="ANGOLA">ANGOLA</option>
                <option value="ANGUILLA">ANGUILLA</option>
                <option value="ANTARCTICA">ANTARCTICA</option>
                <option value="ANTIGUA AND BARBUDA">ANTIGUA AND BARBUDA</option>
                <option value="ARGENTINA">ARGENTINA</option>
                <option value="ARMENIA">ARMENIA</option>
                <option value="ARUBA">ARUBA</option>
                <option value="AUSTRALIA">AUSTRALIA</option>
                <option value="AUSTRIA">AUSTRIA</option>
                <option value="AZERBAIJAN">AZERBAIJAN</option>
                <option value="BAHAMAS">BAHAMAS</option>
                <option value="BAHRAIN">BAHRAIN</option>
                <option value="BANGLADESH">BANGLADESH</option>
                <option value="BARBADOS">BARBADOS</option>
                <option value="BELARUS">BELARUS</option>
                <option value="BELGIUM">BELGIUM</option>
                <option value="BELIZE">BELIZE</option>
                <option value="BENIN">BENIN</option>
                <option value="BERMUDA">BERMUDA</option>
                <option value="BHUTAN">BHUTAN</option>
                <option value="BOLIVIA">BOLIVIA</option>
                <option value="BOSNIA AND HERZEGOVINA">BOSNIA AND HERZEGOVINA</option>
                <option value="BOTSWANA">BOTSWANA</option>
                <option value="BOUVET ISLAND">BOUVET ISLAND</option>
                <option value="BRAZIL">BRAZIL</option>
                <option value="BRITISH INDIAN Ocean Territory">BRITISH INDIAN OCEAN TERRITORY</option>
                <option value="BRUNEI DARUSSALAM">BRUNEI DARUSSALAM</option>
                <option value="BULGARIA">BULGARIA</option>
                <option value="BURKINA FASO">BURKINA FASO</option>
                <option value="BURUNDI">BURUNDI</option>
                <option value="CAMBODIA">CAMBODIA</option>
                <option value="CAMEROON">CAMEROON</option>
                <option value="CANADA">CANADA</option>
                <option value="CAPE VERDE">CAPE VERDE</option>
                <option value="CAYMAN ISLANDS">CAYMAN ISLANDS</option>
                <option value="CENTRAL AFRICAN REPUBLIC">CENTRAL AFRICAN REPUBLIC</option>
                <option value="CHAD">CHAD</option>
                <option value="CHILE">CHILE</option>
                <option value="CHINA">CHINA</option>
                <option value="CHRISTMAS ISLAND">CHRISTMAS ISLAND</option>
                <option value="COCOS (KEELING) ISLANDS">COCOS (KEELING) ISLANDS</option>
                <option value="COLOMBIA">COLOMBIA</option>
                <option value="COMOROS">COMOROS</option>
                <option value="CONGO">CONGO</option>
                <option value="CONGO, THE DEMOCRATIC REPUBLIC OF THE">CONGO, THE DEMOCRATIC REPUBLIC OF THE</option>
                <option value="COOK ISLANDS">COOK ISLANDS</option>
                <option value="COSTA RICA">COSTA RICA</option>
                <option value="COTE D'IVOIRE">COTE D'IVOIRE</option>
                <option value="CROATIA">CROATIA</option>
                <option value="CUBA">CUBA</option>
                <option value="CYPRUS">CYPRUS</option>
                <option value="CZECH REPUBLIC">CZECH REPUBLIC</option>
                <option value="DENMARK">DENMARK</option>
                <option value="DJIBOUTI">DJIBOUTI</option>
                <option value="DOMINICA">DOMINICA</option>
                <option value="DOMINICAN REPUBLIC">DOMINICAN REPUBLIC</option>
                <option value="ECUADOR">ECUADOR</option>
                <option value="EGYPT">EGYPT</option>
                <option value="EL SALVADOR">EL SALVADOR</option>
                <option value="EQUATORIAL GUINEA">EQUATORIAL GUINEA</option>
                <option value="ERITREA">ERITREA</option>
                <option value="ESTONIA">ESTONIA</option>
                <option value="ETHIOPIA">ETHIOPIA</option>
                <option value="FALKLAND ISLANDS (MALVINAS)">FALKLAND ISLANDS (MALVINAS)</option>
                <option value="FAROE ISLANDS">FAROE ISLANDS</option>
                <option value="FIJI">FIJI</option>
                <option value="FINLAND">FINLAND</option>
                <option value="FRANCE">FRANCE</option>
                <option value="FRENCH GUIANA">FRENCH GUIANA</option>
                <option value="FRENCH POLYNESIA">FRENCH POLYNESIA</option>
                <option value="FRENCH SOUTHERN TERRITORIES">FRENCH SOUTHERN TERRITORIES</option>
                <option value="GABON">GABON</option>
                <option value="GAMBIA">GAMBIA</option>
                <option value="GEORGIA">GEORGIA</option>
                <option value="GERMANY">GERMANY</option>
                <option value="GHANA">GHANA</option>
                <option value="GIBRALTAR">GIBRALTAR</option>
                <option value="GREECE">GREECE</option>
                <option value="GREENLAND">GREENLAND</option>
                <option value="GRENADA">GRENADA</option>
                <option value="GUADELOUPE">GUADELOUPE</option>
                <option value="GUAM">GUAM</option>
                <option value="GUATEMALA">GUATEMALA</option>
                <option value="GUERNSEY">GUERNSEY</option>
                <option value="GUINEA">GUINEA</option>
                <option value="GUINEA-BISSAU">GUINEA-BISSAU</option>
                <option value="GUYANA">GUYANA</option>
                <option value="HAITI">HAITI</option>
                <option value="HEARD ISLAND AND MCDONALD ISLANDS">HEARD ISLAND AND MCDONALD ISLANDS</option>
                <option value="HOLY SEE (VATICAN CITY STATE)">HOLY SEE (VATICAN CITY STATE)</option>
                <option value="HONDURAS">HONDURAS</option>
                <option value="HONG KONG">HONG KONG</option>
                <option value="HUNGARY">HUNGARY</option>
                <option value="ICELAND">ICELAND</option>
                <option value="INDIA">INDIA</option>
                <option value="INDONESIA">INDONESIA</option>
                <option value="IRAN, ISLAMIC REPUBLIC OF">IRAN, ISLAMIC REPUBLIC OF</option>
                <option value="IRAQ">IRAQ</option>
                <option value="IRELAND">IRELAND</option>
                <option value="ISLE OF MAN">ISLE OF MAN</option>
                <option value="ISRAEL">ISRAEL</option>
                <option value="ITALY">ITALY</option>
                <option value="JAMAICA">JAMAICA</option>
                <option value="JAPAN">JAPAN</option>
                <option value="JERSEY">JERSEY</option>
                <option value="JORDAN">JORDAN</option>
                <option value="KAZAKHSTAN">KAZAKHSTAN</option>
                <option value="KENYA">KENYA</option>
                <option value="KIRIBATI">KIRIBATI</option>
                <option value="KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF">KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF</option>
                <option value="KOREA, REPUBLIC OF">KOREA, REPUBLIC OF</option>
                <option value="KUWAIT">KUWAIT</option>
                <option value="KYRGYZSTAN">KYRGYZSTAN</option>
                <option value="LAO PEOPLE'S DEMOCRATIC REPUBLIC">LAO PEOPLE'S DEMOCRATIC REPUBLIC</option>
                <option value="LATVIA">LATVIA</option>
                <option value="LEBANON">LEBANON</option>
                <option value="LESOTHO">LESOTHO</option>
                <option value="LIBERIA">LIBERIA</option>
                <option value="LIBYAN ARAB JAMAHIRIYA">LIBYAN ARAB JAMAHIRIYA</option>
                <option value="LIECHTENSTEIN">LIECHTENSTEIN</option>
                <option value="LITHUANIA">LITHUANIA</option>
                <option value="LUXEMBOURG">LUXEMBOURG</option>
                <option value="MACAO">MACAO</option>
                <option value="MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF">MACEDONIA, THE FORMER YUGOSLAV REPUBLIC OF</option>
                <option value="MADAGASCAR">MADAGASCAR</option>
                <option value="MALAWI">MALAWI</option>
                <option value="MALAYSIA">MALAYSIA</option>
                <option value="MALDIVES">MALDIVES</option>
                <option value="MALI">MALI</option>
                <option value="MALTA">MALTA</option>
                <option value="MARSHALL ISLANDS">MARSHALL ISLANDS</option>
                <option value="MARTINIQUE">MARTINIQUE</option>
                <option value="MAURITANIA">MAURITANIA</option>
                <option value="MAURITIUS">MAURITIUS</option>
                <option value="MAYOTTE">MAYOTTE</option>
                <option value="MEXICO">MEXICO</option>
                <option value="MICRONESIA, FEDERATED STATES OF">MICRONESIA, FEDERATED STATES OF</option>
                <option value="MOLDOVA, REPUBLIC OF">MOLDOVA, REPUBLIC OF</option>
                <option value="MONACO">MONACO</option>
                <option value="MONGOLIA">MONGOLIA</option>
                <option value="MONTENEGRO">MONTENEGRO</option>
                <option value="MONTSERRAT">MONTSERRAT</option>
                <option value="MOROCCO">MOROCCO</option>
                <option value="MOZAMBIQUE">MOZAMBIQUE</option>
                <option value="MYANMAR">MYANMAR</option>
                <option value="NAMIBIA">NAMIBIA</option>
                <option value="NAURU">NAURU</option>
                <option value="NEPAL">NEPAL</option>
                <option value="NETHERLANDS">NETHERLANDS</option>
                <option value="NETHERLANDS ANTILLES">NETHERLANDS ANTILLES</option>
                <option value="NEW CALEDONIA">NEW CALEDONIA</option>
                <option value="NEW ZEALAND">NEW ZEALAND</option>
                <option value="NICARAGUA">NICARAGUA</option>
                <option value="NIGER">NIGER</option>
                <option value="NIGERIA">NIGERIA</option>
                <option value="NIUE">NIUE</option>
                <option value="NORFOLK ISLAND">NORFOLK ISLAND</option>
                <option value="NORTHERN MARIANA ISLANDS">NORTHERN MARIANA ISLANDS</option>
                <option value="NORWAY">NORWAY</option>
                <option value="OMAN">OMAN</option>
                <option value="PAKISTAN">PAKISTAN</option>
                <option value="PALAU">PALAU</option>
                <option value="PALESTINIAN TERRITORY, OCCUPIED">PALESTINIAN TERRITORY, OCCUPIED</option>
                <option value="PANAMA">PANAMA</option>
                <option value="PAPUA NEW GUINEA">PAPUA NEW GUINEA</option>
                <option value="PARAGUAY">PARAGUAY</option>
                <option value="PERU">PERU</option>
                <option value="PHILIPPINES">PHILIPPINES</option>
                <option value="PITCAIRN">PITCAIRN</option>
                <option value="POLAND">POLAND</option>
                <option value="PORTUGAL">PORTUGAL</option>
                <option value="PUERTO RICO">PUERTO RICO</option>
                <option value="QATAR">QATAR</option>
                <option value="REUNION">REUNION</option>
                <option value="ROMANIA">ROMANIA</option>
                <option value="RUSSIAN FEDERATION">RUSSIAN FEDERATION</option>
                <option value="RWANDA">RWANDA</option>
                <option value="SAINT HELENA">SAINT HELENA</option>
                <option value="SAINT KITTS AND NEVIS">SAINT KITTS AND NEVIS</option>
                <option value="SAINT LUCIA">SAINT LUCIA</option>
                <option value="SAINT PIERRE AND MIQUELON">SAINT PIERRE AND MIQUELON</option>
                <option value="SAINT VINCENT AND THE GRENADINES">SAINT VINCENT AND THE GRENADINES</option>
                <option value="SAMOA">SAMOA</option>
                <option value="SAN MARINO">SAN MARINO</option>
                <option value="SAO TOME AND PRINCIPE">SAO TOME AND PRINCIPE</option>
                <option value="SAUDI ARABIA">SAUDI ARABIA</option>
                <option value="SENEGAL">SENEGAL</option>
                <option value="SERBIA">SERBIA</option>
                <option value="SEYCHELLES">SEYCHELLES</option>
                <option value="SIERRA LEONE">SIERRA LEONE</option>
                <option value="SINGAPORE">SINGAPORE</option>
                <option value="SLOVAKIA">SLOVAKIA</option>
                <option value="SLOVENIA">SLOVENIA</option>
                <option value="SOLOMON ISLANDS">SOLOMON ISLANDS</option>
                <option value="SOMALIA">SOMALIA</option>
                <option value="SOUTH AFRICA">SOUTH AFRICA</option>
                <option value="SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS">SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS</option>
                <option value="SPAIN">SPAIN</option>
                <option value="SRI LANKA">SRI LANKA</option>
                <option value="SUDAN">SUDAN</option>
                <option value="SURINAME">SURINAME</option>
                <option value="SVALBARD AND JAN MAYEN">SVALBARD AND JAN MAYEN</option>
                <option value="SWAZILAND">SWAZILAND</option>
                <option value="SWEDEN">SWEDEN</option>
                <option value="SWITZERLAND">SWITZERLAND</option>
                <option value="SYRIAN ARAB REPUBLIC">SYRIAN ARAB REPUBLIC</option>
                <option value="TAIWAN, PROVINCE OF CHINA">TAIWAN, PROVINCE OF CHINA</option>
                <option value="TAJIKISTAN">TAJIKISTAN</option>
                <option value="TANZANIA, UNITED REPUBLIC OF">TANZANIA, UNITED REPUBLIC OF</option>
                <option value="THAILAND">THAILAND</option>
                <option value="TIMOR-LESTE">TIMOR-LESTE</option>
                <option value="TOGO">TOGO</option>
                <option value="TOKELAU">TOKELAU</option>
                <option value="TONGA">TONGA</option>
                <option value="TRINIDAD AND TOBAGO">TRINIDAD AND TOBAGO</option>
                <option value="TUNISIA">TUNISIA</option>
                <option value="TURKEY">TURKEY</option>
                <option value="TURKMENISTAN">TURKMENISTAN</option>
                <option value="TURKS AND CAICOS ISLANDS">TURKS AND CAICOS ISLANDS</option>
                <option value="TUVALU">TUVALU</option>
                <option value="UGANDA">UGANDA</option>
                <option value="UKRAINE">UKRAINE</option>
                <option value="UNITED ARAB EMIRATES">UNITED ARAB EMIRATES</option>
                <option value="UNITED KINGDOM">UNITED KINGDOM</option>
                <option value="UNITED STATES">UNITED STATES</option>
                <option value="UNITED STATES MINOR OUTLYING ISLANDS">UNITED STATES MINOR OUTLYING ISLANDS</option>
                <option value="URUGUAY">URUGUAY</option>
                <option value="UZBEKISTAN">UZBEKISTAN</option>
                <option value="VANUATU">VANUATU</option>
                <option value="VENEZUELA">VENEZUELA</option>
                <option value="VIET NAM">VIET NAM</option>
                <option value="VIRGIN ISLANDS, British">VIRGIN ISLANDS, BRITISH</option>
                <option value="VIRGIN ISLANDS, U.S.">VIRGIN ISLANDS, U.S.</option>
                <option value="WALLIS AND FUTUNA">WALLIS AND FUTUNA</option>
                <option value="WESTERN SAHARA">WESTERN SAHARA</option>
                <option value="YEMEN">YEMEN</option>
                <option value="ZAMBIA">ZAMBIA</option>
                <option value="ZIMBABWE">ZIMBABWE</option>
            </select>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-[#23587C]">
          {t('contact_information')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="company"
              >
                {t('company')}
              </label>
              <input
                type="text"
                name="company"
                id="company"
                value={formData.company.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder={t('company')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="profession"
              >
                {t('profession')}
              </label>
              <input
                type="text"
                name="profession"
                id="profession"
                value={formData.profession.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder={t('profession')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                {t('email')}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder={t('email')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="alternateNumber"
              >
                {t('alternate_number')}
              </label>
              <input
                type="text"
                name="alternateNumber"
                id="alternateNumber"
                value={formData.alternateNumber}
                onChange={HandleChangeDigitsOnly(setFormData)}
                placeholder={t('alternate_number')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
                maxLength={15}
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="buildingNumber"
              >
                {t('building_number')}
              </label>
              <input
                type="text"
                name="buildingNumber"
                id="buildingNumber"
                value={formData.buildingNumber}
                onChange={HandleChangeDigitsOnly(setFormData)}
                placeholder={t('building_number')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="streetName"
              >
                {t('street_name')}
              </label>
              <input
                type="text"
                name="streetName"
                id="streetName"
                value={formData.streetName.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder={t('street_name')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="cityVillage"
              >
                {t('city_village')}
              </label>
              <input
                type="text"
                name="cityVillage"
                id="cityVillage"
                value={formData.cityVillage.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder={t('city_village')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="region"
              >
                {t('region')}
              </label>
              <input
                type="text"
                name="region"
                id="region"
                value={formData.region.toUpperCase()}
                onChange={HandleChange(setFormData)}
                placeholder={t('region')}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#23587C]"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 tracking-wide shadow-md rounded font-bold text-white bg-[#D95F08] hover:bg-[#FC8937] focus:outline-none focus:ring-2 focus:ring-[#FC8937]/50 focus:ring-offset-2"
          >
            {t('register')}
          </button>
        </div>
      </div>

      {/* Status Modal */}
      <StatusModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        status={modalState.status}
        message={modalState.message}
      />

    </div>
  );
};

export default RegisterSubscriber;
