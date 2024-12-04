import { NextRequest, NextResponse } from "next/server";
import { RegisterFormData } from "@/api/ApiInterface";
import { verifyData } from "./verifyData";
import { registerUser } from "./registerUser";
import { RegisterError } from "@/api/utils/response/registerError";
import { ApiResponse } from "@/api/utils/response/apiResponse";

export async function POST(req: NextRequest) {
  const response = new ApiResponse();
  const registerError = new RegisterError();
  const registrantData: RegisterFormData = await req.json();

  // validate data filled in the register form
  try {
    const checkDataValidity = await verifyData(registrantData);
    if (!checkDataValidity.success) {
      return NextResponse.json(checkDataValidity, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      response.error(registerError).internalErrorOccurred(),
      { status: 500 }
    );
  }

  // register the registrant
  try {
    await registerUser(registrantData);
  } catch (error) {
    return NextResponse.json(
      response.error(registerError).internalErrorOccurred(),
      { status: 500 }
    );
  }

  return NextResponse.json(response.success());
}
